import { Router } from "express";
import {
  createExpenseController,
  deleteExpenseController,
  getAllExpensesController,
  getExpenseByIdController,
  updateExpenseController,
} from "../controllers/expense.controller.js";
import {
  requireActive,
  requireAdmin,
  requireAuth,
} from "../middlewares/auth.middleware.js";

//initialize router
const router = Router();

//create new expense
router.post("/create", requireAuth, requireActive, createExpenseController);

//get all expenses with filters
router.get("/", requireAuth, requireActive, getAllExpensesController);

//get product by id
router.get("/:expenseId", requireAuth, requireActive, getExpenseByIdController);

//update expense
router.put(
  "/update/:expenseId",
  requireAuth,
  requireActive,
  updateExpenseController,
);

//delete expense
router.delete(
  "/delete/:expenseId",
  requireAuth,
  requireActive,
  requireAdmin,
  deleteExpenseController,
);

export default router;
