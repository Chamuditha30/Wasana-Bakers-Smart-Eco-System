import { startSession } from "mongoose";
import { Order } from "../models/order.model.js";
import { Payment } from "../models/payment.model.js";
import { createError } from "../util/error.util.js";
import { cancelOrderService } from "./order.service.js";

//create new payment
export const createPaymentService = async (
  amount,
  paymentStatus,
  order,
  branch,
  session,
) => {
  //create payment
  const payment = new Payment({
    amount,
    paymentStatus,
    order,
    branch,
  });

  //save payment
  return payment.save({ session });
};

//get all payments with filters
export const getAllPaymentsService = async (branch, filters) => {
  //extract filters
  const { status, search, startDate, endDate, page = 1, limit = 20 } = filters;

  //initialize query with branch
  const query = { branch };

  //validate payment status
  const allowedStatuses = ["pending", "confirmed", "rejected"];

  if (status) {
    if (!allowedStatuses.includes(status))
      throw createError("Invalid payment status", 400);

    query.status = status;
  }

  //search by order reference or customer details
  if (search && search.trim()) {
    const searchRegex = new RegExp(
      search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "i",
    );

    //find matching orders
    const orders = await Order.find({
      branch,
      $or: [
        { orderRef: searchRegex },
        { "customer.name": searchRegex },
        { "customer.phone": searchRegex },
      ],
    }).select("_id");

    //get matching order IDs
    const orderIds = orders.map((order) => order._id);

    query.order = { $in: orderIds };
  }

  //filter by payment creation date
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

  //retrieve payments and total count
  const [payments, total] = await Promise.all([
    Payment.find(query)
      .populate({
        path: "order",
        select: "orderRef customer source paymentMethod orderStatus createdAt",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage),

    Payment.countDocuments(query),
  ]);

  //return payments with pagination details
  return {
    payments,
    total,
    page: currentPage,
    limit: perPage,
    totalPages: Math.ceil(total / perPage),
  };
};

//get payment by id
export const getPaymentByIdService = async (_id, branch) => {
  // find payment
  const payment = await Payment.findOne({
    _id,
    branch,
  }).populate({
    path: "order",
    select:
      "orderRef customer source paymentMethod orderStatus items totalAmount pickupSlot createdAt",
    populate: {
      path: "pickupSlot",
      select: "date startTime endTime",
    },
  });

  if (!payment) throw createError("Payment not found", 404);

  return payment;
};

//confirm payment
export const confirmPaymentService = async (_id, branch, staffId) => {
  //initialize transaction session
  const session = await startSession();

  try {
    //initialize payment
    let payment;

    await session.withTransaction(async () => {
      //find payment
      payment = await Payment.findOne({
        _id,
        branch,
      }).session(session);

      if (!payment) throw createError("Payment not found", 404);

      //only pending payments can be confirmed
      if (payment.paymentStatus !== "pending")
        throw createError("Only pending payments can be confirmed", 400);

      //find related order
      const order = await Order.findOne({
        _id: payment.order,
        branch,
      }).session(session);

      if (!order) throw createError("Order not found", 404);

      //only bank transfer payments can be confirmed
      if (order.source !== "online" || order.paymentMethod !== "bank_transfer")
        throw createError("Only bank transfer payments can be confirmed", 400);

      //order must still be pending
      if (order.orderStatus !== "pending")
        throw createError("This order cannot be confirmed", 400);

      //update payment
      payment.paymentStatus = "confirmed";
      payment.confirmedBy = staffId;
      payment.confirmedAt = new Date();

      await payment.save({ session });

      //update order
      order.orderStatus = "confirmed";

      await order.save({ session });
    });

    return payment;
  } finally {
    //end transaction session
    await session.endSession();
  }
};

//reject payment
export const rejectPaymentService = async (_id, branch) => {
  //initialize transaction session
  const session = await startSession();

  try {
    //initialize payment
    let payment;

    await session.withTransaction(async () => {
      //find payment
      payment = await Payment.findOne({
        _id,
        branch,
      }).session(session);

      if (!payment) throw createError("Payment not found", 404);

      //only pending payments can be rejected
      if (payment.paymentStatus !== "pending")
        throw createError("Only pending payments can be rejected", 400);

      //find related order
      const order = await Order.findOne({
        _id: payment.order,
        branch,
      }).session(session);

      if (!order) throw createError("Order not found", 404);

      // only bank transfer payments can be rejected
      if (order.source !== "online" || order.paymentMethod !== "bank_transfer")
        throw createError("Only bank transfer payments can be rejected", 400);

      //update payment
      payment.paymentStatus = "rejected";

      await payment.save({ session });

      //cancel related order using existing transaction
      await cancelOrderService(order._id, branch, session);
    });

    return payment;
  } finally {
    //end transaction session
    await session.endSession();
  }
};
