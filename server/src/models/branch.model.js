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
      bankName: "Bank of Ceylon",
      accountName: "Wasana Bakers PVT/LTD",
      accountNumber: "1234567890",
      branch: "Anuradhapura",
    },

    paymentMethods: {
      bankTransfer: true,
      payOnPickup: true,
    },

    pickupSettings: {
      slotDurationMinutes: 60,
      defaultCapacity: 10,
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
