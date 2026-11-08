import { Schema, model } from "mongoose";

//create model
const pickupSlotSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
      default: 10,
    },

    isActive: {
      type: Boolean,
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

export const PickupSlot = model("PickupSlot", pickupSlotSchema);
