import { Schema, model } from "mongoose";

//create model
const paymentSchema = new Schema(
  {
    paymentRef: {
      type: String,
      required: true,
      unique: true,
    },

    method: {
      type: String,
      enum: ["bank_transfer", "pay_on_pickup"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected"],
      default: "pending",
    },

    //user reference
    confirmedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    confirmedAt: {
      type: Date,
      default: null,
    },

    //order reference
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    //branch reference
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
  },
  { timestamps: true },
);

export const Payment = model("Payment", paymentSchema);
