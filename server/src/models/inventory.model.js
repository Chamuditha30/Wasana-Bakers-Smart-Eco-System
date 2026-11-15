import { Schema, model } from "mongoose";

//create model
const inventorySchema = new Schema(
  {
    available: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    reserved: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    lowStockThreshold: {
      type: Number,
      required: true,
      min: 0,
    },

    stockUnit: {
      type: String,
      enum: ["grams", "pieces"],
      required: true,
    },

    //product reference
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
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

//prevent duplicate inventory for the same product size and branch
inventorySchema.index({ product: 1, branch: 1 }, { unique: true });

export const Inventory = model("Inventory", inventorySchema);
