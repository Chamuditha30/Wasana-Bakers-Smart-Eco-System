import { Router } from "express";
import {
  confirmPaymentController,
  getAllPaymentsController,
  getPaymentByIdController,
  rejectPaymentController,
} from "../controllers/payment.controller.js";
import { requireActive, requireAuth } from "../middlewares/auth.middleware.js";

//initialize router
const router = Router();

//get all payments with filters
router.get("/", requireAuth, requireActive, getAllPaymentsController);

//get payment by id
router.get("/:paymentId", requireAuth, requireActive, getPaymentByIdController);

//confirm payment
router.put(
  "/confirm/:paymentId",
  requireAuth,
  requireActive,
  confirmPaymentController,
);

//reject payment
router.put(
  "/reject/:paymentId",
  requireAuth,
  requireActive,
  rejectPaymentController,
);

export default router;
