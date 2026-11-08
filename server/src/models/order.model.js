import { Schema, model } from "mongoose";

//create model
const orderSchema = new Schema(
  {
    //unique order reference
    orderRef: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    //order source
    source: {
      type: String,
      enum: ["online", "pos"],
      required: true,
    },

    //customer details
    customer: {
      name: {
        type: String,
        trim: true,
      },

      phone: {
        type: String,
        trim: true,
      },
    },

    //order items
    items: {
      type: [
        {
          //product reference
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },

          //product snapshot
          productName: {
            type: String,
            required: true,
          },

          pricingType: {
            type: String,
            enum: ["per_kg", "fixed"],
            required: true,
          },

          //price per kg or per cake
          unitPrice: {
            type: Number,
            required: true,
            min: 0,
          },

          //weight for regular cakes
          weight: {
            type: Number,
            min: 0,
          },

          //qty for special cakes
          quantity: {
            type: Number,
            required: true,
            min: 1,
          },

          //final price for this item
          lineTotal: {
            type: Number,
            required: true,
            min: 0,
          },

          message: {
            type: String,
            default: "",
          },
        },
      ],
      validate: {
        validator: (items) => items.length > 0,
        message: "An order must contain at least one item",
      },
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: ["bank_transfer", "pay_on_pickup", "cash"],
      required: true,
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
      required: function () {
        return this.source === "online";
      },
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
