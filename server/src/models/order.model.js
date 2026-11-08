import { Schema, model } from "mongoose";

//create model
const orderSchema = new Schema(
  {
    orderRef: {
      type: String,
      required: true,
      unique: true,
    },

    source: {
      type: String,
      enum: ["online", "pos"],
      required: true,
    },

    customer: {
      name: {
        type: String,
        required: function () {
          return this.source === "website";
        },
      },

      phone: {
        type: String,
        required: function () {
          return this.source === "website";
        },
      },
    },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        productName: {
          type: String,
          required: true,
        },

        size: {
          type: String,
          required: true,
        },

        unitPrice: {
          type: Number,
          required: true,
          min: 0,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        message: {
          type: String,
          default: "",
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "confirmed", "rejected"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    //pickup slot reference
    pickupSlot: {
      type: Schema.Types.ObjectId,
      ref: "PickupSlot",
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

export const Order = model("Order", orderSchema);
