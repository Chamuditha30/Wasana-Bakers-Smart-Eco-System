import {
  confirmPaymentService,
  getAllPaymentsService,
  getPaymentByIdService,
  rejectPaymentService,
} from "../services/payment.service.js";
import { asyncHandler } from "../util/async.util.js";

//get all payments with filters
export const getAllPaymentsController = asyncHandler(async (req, res) => {
  const payments = await getAllPaymentsService(req.user.branchId, req.query);

  res.status(200).json({
    message: "Payments retrieved successfully",
    data: payments,
  });
});

//get payment by id
export const getPaymentByIdController = asyncHandler(async (req, res) => {
  const payment = await getPaymentByIdService(
    req.params.paymentId,
    req.user.branchId,
  );

  res.status(200).json({
    message: "Payment retrieved successfully",
    data: payment,
  });
});

//confirm payment
export const confirmPaymentController = asyncHandler(async (req, res) => {
  const payment = await confirmPaymentService(
    req.params.paymentId,
    req.user.branchId,
    req.user.userId,
  );

  res.status(200).json({
    message: "Payment confirmed successfully",
    data: payment,
  });
});

//reject payment
export const rejectPaymentController = asyncHandler(async (req, res) => {
  const payment = await rejectPaymentService(
    req.params.paymentId,
    req.user.branchId,
  );

  res.status(200).json({
    message: "Payment rejected successfully",
    data: payment,
  });
});
