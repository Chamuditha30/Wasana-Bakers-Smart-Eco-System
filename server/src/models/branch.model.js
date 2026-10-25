import { Schema, model } from "mongoose";

//create day model
const daySchema = new Schema(
  {
    open: {
      type: String,
      default: "08:00",
    },
    close: {
      type: String,
      default: "19:00",
    },
  },
  { _id: false },
);

//create branch model
const branchSchema = new Schema(
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

    address: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    openingHours: {
      monday: { type: daySchema, default: () => ({}) },
      tuesday: { type: daySchema, default: () => ({}) },
      wednesday: { type: daySchema, default: () => ({}) },
      thursday: { type: daySchema, default: () => ({}) },
      friday: { type: daySchema, default: () => ({}) },
      saturday: { type: daySchema, default: () => ({}) },
      sunday: { type: daySchema, default: () => ({}) },
    },

    bankDetails: {
      bankName: {
        type: String,
        required: true,
      },
      accountName: {
        type: String,
        required: true,
      },
      accountNumber: {
        type: String,
        required: true,
      },
      branch: {
        type: String,
        required: true,
      },
    },

    paymentMethods: {
      bankTransfer: {
        type: Boolean,
        default: true,
      },
      payOnPickup: {
        type: Boolean,
        default: true,
      },
    },

    pickupSettings: {
      slotDurationMinutes: {
        type: Number,
        default: 60,
      },
      defaultCapacity: {
        type: Number,
        default: 10,
      },
    },

    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true },
);

export const Branch = model("Branch", branchSchema);
