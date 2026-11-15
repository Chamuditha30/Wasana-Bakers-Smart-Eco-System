import { startSession } from "mongoose";
import { createError } from "../util/error.util.js";
import { generateRef } from "../util/generate.util.js";
import { Order } from "../models/order.model.js";
import {
  bookPickupSlotService,
  releasePickupSlotService,
} from "./pickupSlot.service.js";
import { createPaymentService } from "./payment.service.js";
import { Branch } from "../models/branch.model.js";
import { Payment } from "../models/payment.model.js";

//create new order
export const createOrderService = async (branchValue, data, source) => {
  //initialize transaction session
  const session = await startSession();

  try {
    //initialize order
    let order;

    //start transaction session
    await session.withTransaction(async () => {
      //validate order source
      if (!["online", "pos"].includes(source))
        throw createError("Invalid order source", 400);

      //find branch
      let branch;

      if (source === "online") {
        //find branch using slug
        branch = await Branch.findOne({
          slug: branchValue,
          isActive: true,
        }).select("_id");

        if (!branch) {
          throw createError("Branch not found or inactive", 404);
        }

        //get branch ID
        branch = branch._id;
      } else {
        //use branch ID from authenticated staff
        branch = branchValue;
      }

      //extract date
      const { customer, items, totalAmount, paymentMethod, pickupSlot } = data;

      // validate payment method
      if (
        source === "online" &&
        !["bank_transfer", "pay_on_pickup"].includes(paymentMethod)
      )
        throw createError("Invalid online payment method", 400);

      if (source === "pos" && paymentMethod !== "cash")
        throw createError("POS only supports cash payments", 400);

      //apply pay on pickup restrictions
      if (source === "online" && paymentMethod === "pay_on_pickup") {
        //validate customer phone
        const phone = customer?.phone?.trim();

        if (!phone) throw createError("Customer phone number is required", 400);

        //check existing active pay on pickup order
        const existingOrder = await Order.findOne({
          branch,
          source: "online",
          paymentMethod: "pay_on_pickup",
          "customer.phone": phone,
          orderStatus: {
            $nin: ["completed", "cancelled"],
          },
        }).session(session);

        if (existingOrder)
          throw createError(
            "This phone number already has an active Pay on Pickup order",
            400,
          );

        //validate item limits
        for (const item of items) {
          if (item.pricingType === "fixed" && item.quantity > 1)
            throw createError(
              "Pay on Pickup allows only one fixed price cake per item",
              400,
            );

          if (item.pricingType === "per_kg" && item.weight > 1)
            throw createError(
              "Pay on Pickup allows a maximum of 1kg per regular cake",
              400,
            );
        }
      }

      //generate order reference
      const orderRef = generateRef(source === "online" ? "WB" : "POS");

      //determine initial statuses
      const orderStatus =
        source === "pos"
          ? "completed"
          : paymentMethod === "pay_on_pickup"
            ? "confirmed"
            : "pending";

      const paymentStatus = source === "pos" ? "confirmed" : "pending";

      // create order
      order = new Order({
        orderRef,
        source,
        customer,
        items,
        totalAmount,
        paymentMethod,
        orderStatus,
        pickupSlot,
        branch,
      });

      //save order
      await order.save({ session });

      //reserve pickup slot for online orders
      if (source === "online") {
        await bookPickupSlotService(pickupSlot, branch, session);
      }

      //create payment
      await createPaymentService(
        totalAmount,
        paymentStatus,
        order._id,
        branch,
        session,
      );
    });

    return order;
  } finally {
    //end transaction session
    await session.endSession();
  }
};

//get all orders with filters
export const getAllOrdersService = async (branch, filters) => {
  //extract filters
  const {
    status,
    source,
    search,
    startDate,
    endDate,
    page = 1,
    limit = 20,
  } = filters;

  //initialize query with branch
  const query = { branch };

  //validate order status
  const allowedStatuses = [
    "pending",
    "confirmed",
    "preparing",
    "ready",
    "completed",
    "cancelled",
  ];

  if (status) {
    if (!allowedStatuses.includes(status))
      throw createError("Invalid order status", 400);

    query.orderStatus = status;
  }

  //validate order source
  if (source) {
    if (!["online", "pos"].includes(source)) {
      throw createError("Invalid order source", 400);
    }

    query.source = source;
  }

  //search by order reference or customer details
  if (search && search.trim()) {
    const searchRegex = new RegExp(
      search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "i",
    );

    query.$or = [
      { orderRef: searchRegex },
      { "customer.name": searchRegex },
      { "customer.phone": searchRegex },
    ];
  }

  //filter by date
  if (startDate || endDate) {
    query.createdAt = {};

    if (startDate) {
      const start = new Date(`${startDate}T00:00:00.000+05:30`);

      if (Number.isNaN(start.getTime()))
        throw createError("Invalid start date", 400);

      query.createdAt.$gte = start;
    }

    if (endDate) {
      const end = new Date(`${endDate}T00:00:00.000+05:30`);

      if (Number.isNaN(end.getTime()))
        throw createError("Invalid end date", 400);

      //include the entire ending date
      end.setTime(end.getTime() + 24 * 60 * 60 * 1000);

      query.createdAt.$lt = end;
    }
  }

  //validate date range
  if (
    startDate &&
    endDate &&
    new Date(`${startDate}T00:00:00.000+05:30`) >
      new Date(`${endDate}T00:00:00.000+05:30`)
  )
    throw createError("Invalid date range", 400);

  //pagination
  const currentPage = Math.max(1, Number(page) || 1);
  const perPage = Math.min(50, Math.max(1, Number(limit) || 20));

  const skip = (currentPage - 1) * perPage;

  //retrieve orders and total count
  const [orders, total] = await Promise.all([
    Order.find(query)
      .populate("pickupSlot", "date startTime endTime")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage),

    Order.countDocuments(query),
  ]);

  //return orders with pagination details
  return {
    orders,
    total,
    page: currentPage,
    limit: perPage,
    totalPages: Math.ceil(total / perPage),
  };
};

//get order by id
export const getOrderByIdService = async (_id, branch) => {
  //find order
  const order = await Order.findOne({ _id, branch })
    .populate("pickupSlot", "date startTime endTime")
    .populate("branch", "name address phone");

  if (!order) throw createError("Order not found", 404);

  //find related payment
  const payment = await Payment.findOne({
    order: order._id,
    branch,
  }).select("-branch -order");

  return {
    order,
    payment,
  };
};

//track order using ref for customer
export const trackOrderByRefService = async (orderRef) => {
  //validate order ref
  if (!orderRef || !orderRef.trim())
    throw createError("Order reference is required", 400);

  //find order
  const order = await Order.findOne({
    orderRef: orderRef.trim().toUpperCase(),
  })
    .select(
      "orderRef source customer items totalAmount paymentMethod orderStatus pickupSlot createdAt",
    )
    .populate({
      path: "pickupSlot",
      select: "date startTime endTime",
    })
    .lean();

  if (!order)
    throw createError("Order not found. Please check your reference.", 404);

  //find related payment
  const payment = await Payment.findOne({
    order: order._id,
  })
    .select("amount status confirmedAt createdAt")
    .lean();

  return { order, payment };
};

//update order status
export const updateOrderStatusService = async (_id, branch, orderStatus) => {
  //allowed status transitions
  const allowedTransitions = {
    confirmed: "preparing",
    preparing: "ready",
    ready: "completed",
  };

  //validate order status
  if (!Object.values(allowedTransitions).includes(orderStatus))
    throw createError("Invalid order status", 400);

  //find order
  const order = await Order.findOne({
    _id,
    branch,
  });

  if (!order) throw createError("Order not found", 404);

  //prevent POS order status updates
  if (order.source === "pos")
    throw createError("POS orders cannot be updated", 400);

  //check payment for bank transfer orders
  if (order.paymentMethod === "bank_transfer") {
    const payment = await Payment.findOne({
      order: order._id,
      branch,
    });

    if (!payment || payment.paymentStatus !== "confirmed")
      throw createError(
        "Order status can only be updated after payment confirmation",
        400,
      );
  }

  //update order status
  order.start = orderStatus;

  await order.save();

  return order;
};

//cancel order
export const cancelOrderService = async (_id, branch, session = null) => {
  //cancellation operation
  const cancelOrder = async (activeSession) => {
    //find order
    const order = await Order.findOne({ _id, branch }).session(activeSession);

    if (!order) throw createError("Order not found", 404);

    //prevent cancelling completed or cancelled orders
    if (["completed", "cancelled"].includes(order.orderStatus))
      throw createError("This order cannot be cancelled", 400);

    //update order status
    order.orderStatus = "cancelled";

    await order.save({ session: activeSession });

    //release pickup slot for online orders
    if (order.source === "online" && order.pickupSlot)
      await releasePickupSlotService(order.pickupSlot, branch, activeSession);

    return order;
  };

  //use existing transaction session
  if (session) return cancelOrder(session);

  //create a new transaction for direct cancellation
  const newSession = await startSession();

  try {
    let order;

    await newSession.withTransaction(async () => {
      order = await cancelOrder(newSession);
    });

    return order;
  } finally {
    await newSession.endSession();
  }
};
