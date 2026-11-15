import { Expense } from "../models/expense.model.js";
import { createError } from "../util/error.util.js";

//create new expense
export const createExpenseService = async (branch, data) => {
  //extract data
  const { category, description, amount, date } = data;

  //validate amount
  if (amount <= 0) throw createError("Invalid expense amount", 400);

  //create expense
  const expense = await Expense.create({
    category,
    description,
    amount,
    date,
    branch,
  });

  return expense;
};

//get all expenses with filters
export const getAllExpensesService = async (branch, filters) => {
  //extract filters
  const { category, search, from, to } = filters;

  //initialize query with branch
  const query = { branch };

  //filter by category
  if (category) {
    query.category = category;
  }

  //search by description
  if (search && search.trim()) {
    query.description = {
      $regex: search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      $options: "i",
    };
  }

  //filter by date range
  if (from || to) {
    query.date = {};

    if (from) {
      const startDate = new Date(from);

      if (Number.isNaN(startDate.getTime())) {
        throw createError("Invalid start date", 400);
      }

      query.date.$gte = startDate;
    }

    if (to) {
      const endDate = new Date(to);

      if (Number.isNaN(endDate.getTime())) {
        throw createError("Invalid end date", 400);
      }

      // include the entire end date
      endDate.setUTCHours(23, 59, 59, 999);

      query.date.$lte = endDate;
    }

    //validate date range
    if (
      query.date.$gte &&
      query.date.$lte &&
      query.date.$gte > query.date.$lte
    ) {
      throw createError("Invalid date range", 400);
    }
  }

  //get expenses
  const expenses = await Expense.find(query).sort({ date: -1 });

  return expenses;
};

//get product by id
export const getExpenseByIdService = async (_id, branch) => {
  const expense = await Expense.findOne({ _id, branch });

  if (!expense) throw createError("Expense not found", 404);

  return expense;
};

//update expense
export const updateExpenseService = async (_id, branch, data) => {
  //allowed fields
  const allowedFields = ["category", "description", "amount", "date"];

  const updateData = Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key)),
  );

  //reject empty updates
  if (Object.keys(updateData).length === 0)
    throw createError("No valid fields provided", 400);

  //validate amount
  if (updateData.amount !== undefined && updateData.amount <= 0)
    throw createError("Invalid expense amount", 400);

  //update expense
  const expense = await Expense.findOneAndUpdate(
    { _id, branch },
    { $set: updateData },
    { new: true, runValidators: true },
  );

  if (!expense) throw createError("Expense not found", 404);

  return expense;
};

//delete expense
export const deleteExpenseService = async (_id, branch) => {
  //find and delete expense
  const expense = await Expense.findOneAndDelete({ _id, branch });

  if (!expense) throw createError("Expense not found", 404);

  return expense;
};
