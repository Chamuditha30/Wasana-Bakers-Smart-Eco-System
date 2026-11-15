import {
  cancelOrderService,
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
  trackOrderByRefService,
  updateOrderStatusService,
} from "../services/order.service.js";
import { asyncHandler } from "../util/async.util.js";

//create new online order
export const createOnlineOrderController = asyncHandler(async (req, res) => {
  const order = await createOrderService(req.params.slug, req.body, "online");

  res.status(201).json({
    message: "Online order created successfully",
    data: order,
  });
});

//create new online order
export const createPosOrderController = asyncHandler(async (req, res) => {
  const order = await createOrderService(req.user.branchId, req.body, "pos");

  res.status(201).json({
    message: "POS order created successfully",
    data: order,
  });
});

//get all orders with filters
export const getAllOrdersController = asyncHandler(async (req, res) => {
  const orders = await getAllOrdersService(req.user.branchId, req.query);

  res.status(200).json({
    message: "Orders retrieved successfully",
    data: orders,
  });
});

//get order by id
export const getOrderByIdController = asyncHandler(async (req, res) => {
  const order = await getOrderByIdService(
    req.params.orderId,
    req.user.branchId,
  );

  res.status(200).json({
    message: "Order retrieved successfully",
    data: order,
  });
});

//track order using ref for customer
export const trackOrderByRefController = asyncHandler(async (req, res) => {
  const order = await trackOrderByRefService(req.body.orderRef);

  res.status(200).json({
    message: "Order retrieved successfully",
    data: order,
  });
});

//update order status
export const updateOrderStatusController = asyncHandler(async (req, res) => {
  const order = await updateOrderStatusService(
    req.params.orderId,
    req.user.branchId,
    req.body.orderStatus,
  );

  res.status(200).json({
    message: "Order updated successfully",
    data: order,
  });
});

//cancel order
export const cancelOrderController = asyncHandler(async (req, res) => {
  const order = await cancelOrderService(req.params.orderId, req.user.branchId);

  res.status(200).json({
    message: "Order cancelled successfully",
    data: order,
  });
});
