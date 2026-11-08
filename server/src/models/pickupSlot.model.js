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
    },

    bookedCount: {
      type: Number,
      default: 0,
      min: 0,
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

//create compound indexes for prevent duplicate pickup slots
pickupSlotSchema.index(
  {
    branch: 1,
    date: 1,
    startTime: 1,
  },
  { unique: true },
);

export const PickupSlot = model("PickupSlot", pickupSlotSchema);
