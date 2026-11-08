import { Schema, model } from "mongoose";

//create model
const paymentSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentStatus: {
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

paymentSchema.index({ order: 1 }, { unique: true });

export const Payment = model("Payment", paymentSchema);
