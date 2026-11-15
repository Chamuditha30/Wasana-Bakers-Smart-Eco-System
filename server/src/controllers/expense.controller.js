import {
  createExpenseService,
  deleteExpenseService,
  getAllExpensesService,
  getExpenseByIdService,
  updateExpenseService,
} from "../services/expense.service.js";
import { asyncHandler } from "../util/async.util.js";

//create new expense
export const createExpenseController = asyncHandler(async (req, res) => {
  const expense = await createExpenseService(req.user.branchId, req.body);

  res.status(201).json({
    message: "Expense created successfully",
    data: expense,
  });
});

//get all expenses with filters
export const getAllExpensesController = asyncHandler(async (req, res) => {
  const expenses = await getAllExpensesService(req.user.branchId, req.query);

  res.status(200).json({
    message: "Expenses retrieved successfully",
    data: expenses,
  });
});

//get product by id
export const getExpenseByIdController = asyncHandler(async (req, res) => {
  const expense = await getExpenseByIdService(
    req.params.expenseId,
    req.user.branchId,
  );

  res.status(200).json({
    message: "Expense retrieved successfully",
    data: expense,
  });
});

//update expense
export const updateExpenseController = asyncHandler(async (req, res) => {
  const expense = await updateExpenseService(
    req.params.expenseId,
    req.user.branchId,
    req.body,
  );

  res.status(200).json({
    message: "Expense updated successfully",
    data: expense,
  });
});

//delete expense
export const deleteExpenseController = asyncHandler(async (req, res) => {
  const expense = await deleteExpenseService(
    req.params.expenseId,
    req.user.branchId,
  );

  res.status(200).json({
    message: "Expense deleted successfully",
    data: expense,
  });
});
