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
      default: 5,
      min: 0,
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

export const Inventory = model("Inventory", inventorySchema);
