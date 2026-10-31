import { Schema, model } from "mongoose";

//create model
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },

        publicId: {
          type: String,
          required: true,
        },
      },
    ],

    pricingType: {
      type: String,
      enum: ["by_weight", "fixed"],
      required: true,
    },

    pricePerKg: {
      type: Number,
      min: 0,
    },

    price: {
      type: Number,
      min: 0,
    },

    size: {
      type: String,
      trim: true,
    },

    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
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

export const Product = model("Product", productSchema);
