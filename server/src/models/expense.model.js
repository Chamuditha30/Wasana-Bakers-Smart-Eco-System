import { Schema, model } from "mongoose";

const expenseSchema = new Schema(
  {
    category: {
      type: String,
      enum: [
        "ingredients",
        "packaging",
        "utilities",
        "transport",
        "equipment",
        "other",
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    // Branch reference
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
  },
  { timestamps: true },
);

export const Expense = model("Expense", expenseSchema);
