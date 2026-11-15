import {
  convertToDate,
  getDayName,
  minutesToTime,
  timeToMinutes,
  validateDate,
  validateFutureDate,
  validateTimeRange,
} from "../util/dateTime.util.js";
import { Branch } from "../models/branch.model.js";
import { PickupSlot } from "../models/pickupSlot.model.js";
import { createError } from "../util/error.util.js";

//generate pickup slots
export const generatePickupSlotsService = async (branchId, date) => {
  //validate date
  if (!validateFutureDate(date)) throw createError("Invalid pickup date", 400);

  //convert date
  const selectedDate = convertToDate(date);

  //find branch
  const branch = await Branch.findById(branchId);

  if (!branch) throw createError("Branch not found", 404);

  if (!branch.isActive) throw createError("Branch is inactive", 400);

  //get opening hours
  const dayName = getDayName(selectedDate);
  const hours = branch.openingHours[dayName];

  if (!hours || !validateTimeRange(hours.open, hours.close))
    throw createError("Invalid branch opening hours", 400);

  //get pickup settings
  const { slotDurationMinutes, defaultCapacity } = branch.pickupSettings;

  if (
    !Number.isInteger(slotDurationMinutes) ||
    slotDurationMinutes <= 0 ||
    !Number.isInteger(defaultCapacity) ||
    defaultCapacity <= 0
  )
    throw createError("Invalid pickup settings", 400);

  //check existing slots
  const existingSlots = await PickupSlot.exists({
    branch: branchId,
    date: selectedDate,
  });

  if (existingSlots)
    throw createError("Pickup slots already exist for this date", 409);

  //convert opening hours into minutes
  const openTime = timeToMinutes(hours.open);
  const closeTime = timeToMinutes(hours.close);

  //generate slots
  const slots = [];

  for (
    let start = openTime;
    start + slotDurationMinutes <= closeTime;
    start += slotDurationMinutes
  ) {
    const end = start + slotDurationMinutes;

    slots.push({
      date: selectedDate,
      startTime: minutesToTime(start),
      endTime: minutesToTime(end),
      capacity: defaultCapacity,
      branch: branchId,
    });
  }

  if (slots.length === 0) throw createError("No pickup slots available", 400);

  //save slots
  return await PickupSlot.insertMany(slots);
};

//get all pickup dates for admin
export const getAllPickupSlotsService = async (branch) => {
  //get all pickup slots
  const slots = await PickupSlot.find({ branch }).sort({
    date: 1,
    startTime: 1,
  });

  //group slots by date
  const groupedSlots = {};

  slots.forEach((slot) => {
    const date = slot.date.toISOString().split("T")[0];

    if (!groupedSlots[date]) groupedSlots[date] = [];

    //add available capacity
    groupedSlots[date].push({
      ...slot.toObject(),
      availableCapacity: slot.capacity - slot.bookedCount,
    });
  });

  //return grouped slots
  return Object.entries(groupedSlots).map(([date, pickupSlots]) => ({
    date,
    pickupSlots,
  }));
};

//get pickup slots by date for admin
export const getAdminPickupSlotsByDateService = async (branch, date) => {
  //validate date
  if (!validateDate(date)) throw createError("Invalid pickup date", 400);

  //convert date
  const selectedDate = convertToDate(date);

  //get pickup slots
  const slots = await PickupSlot.find({
    branch,
    date: selectedDate,
  }).sort({ startTime: 1 });

  //add available capacity
  return slots.map((slot) => ({
    ...slot.toObject(),
    availableCapacity: slot.capacity - slot.bookedCount,
  }));
};

//get pickup slots by date for customer
export const getPublicPickupSlotsByDateService = async (slug, date) => {
  //validate date
  if (!validateDate(date)) throw createError("Invalid pickup date", 400);

  //convert date
  const selectedDate = convertToDate(date);

  //find branch by slug
  const branch = await Branch.findOne({
    slug,
    isActive: true,
  });

  if (!branch) throw createError("Branch not found or inactive", 404);

  //get pickup slots
  const slots = await PickupSlot.find({
    branch: branch._id,
    date: selectedDate,
    isActive: true,
    $expr: {
      $lt: ["$bookedCount", "$capacity"],
    },
  }).sort({ startTime: 1 });

  //add available capacity
  return slots.map((slot) => ({
    ...slot.toObject(),
    availableCapacity: slot.capacity - slot.bookedCount,
  }));
};

//deactivate pickup slot
export const deactivatePickupSlotService = async (_id, branch) => {
  //find pickup slot
  const slot = await PickupSlot.findOne({ _id, branch });

  if (!slot) throw createError("Pickup slot not found", 404);

  //deactivate pickup slot
  slot.isActive = false;

  return slot.save();
};

//activate pickup slot
export const activatePickupSlotService = async (_id, branch) => {
  //find pickup slot
  const slot = await PickupSlot.findOne({ _id, branch });

  if (!slot) throw createError("Pickup slot not found", 404);

  //activate pickup slot
  slot.isActive = true;

  return slot.save();
};

//book pickup slot
export const bookPickupSlotService = async (_id, branch, session) => {
  //find and update pickup slot
  const slot = await PickupSlot.findOneAndUpdate(
    {
      _id,
      branch,
      isActive: true,
      $expr: {
        $lt: ["$bookedCount", "$capacity"],
      },
    },
    {
      $inc: { bookedCount: 1 },
    },
    {
      new: true,
      session,
    },
  );

  if (!slot) throw createError("Pickup slot is unavailable", 400);

  return slot;
};

//release pickup slot
export const releasePickupSlotService = async (_id, branch, session) => {
  //find and update pickup slot
  const slot = await PickupSlot.findOneAndUpdate(
    {
      _id,
      branch,
      bookedCount: { $gt: 0 },
    },
    {
      $inc: { bookedCount: -1 },
    },
    {
      new: true,
      session,
    },
  );

  if (!slot) throw createError("Unable to release pickup slot", 400);

  return slot;
};
