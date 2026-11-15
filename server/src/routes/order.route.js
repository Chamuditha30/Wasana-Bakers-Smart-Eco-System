import { Router } from "express";
import {
  cancelOrderController,
  createOnlineOrderController,
  createPosOrderController,
  getAllOrdersController,
  getOrderByIdController,
  trackOrderByRefController,
  updateOrderStatusController,
} from "../controllers/order.controller.js";
import { requireActive, requireAuth } from "../middlewares/auth.middleware.js";

//initialize router
const router = Router();

//create online order
router.post("/create/online/:slug", createOnlineOrderController);

//create pos order
router.post(
  "/create/pos",
  requireAuth,
  requireActive,
  createPosOrderController,
);

//get all orders with filters
router.get("/", requireAuth, requireActive, getAllOrdersController);

//get order by id
router.get("/:orderId", requireAuth, requireActive, getOrderByIdController);

//track order using ref for customer
router.post("/track", trackOrderByRefController);

//update order status
router.put(
  "/update/:orderId",
  requireAuth,
  requireActive,
  updateOrderStatusController,
);

//cancel order
router.put(
  "/cancel/:orderId",
  requireAuth,
  requireActive,
  cancelOrderController,
);

export default router;
