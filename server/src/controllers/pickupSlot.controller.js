import {
  activatePickupSlotService,
  deactivatePickupSlotService,
  generatePickupSlotsService,
  getAdminPickupSlotsByDateService,
  getAllPickupSlotsService,
  getPublicPickupSlotsByDateService,
} from "../services/pickupSlot.service.js";
import { asyncHandler } from "../util/async.util.js";

//generate pickup slots
export const generatePickupSlotsController = asyncHandler(async (req, res) => {
  const pickupSlots = await generatePickupSlotsService(
    req.user.branchId,
    req.body.date,
  );

  res.status(201).json({
    message: "Pickup slots created successfully",
    data: pickupSlots,
  });
});

//get all pickup dates for admin
export const getAllPickupSlotsController = asyncHandler(async (req, res) => {
  const pickupSlots = await getAllPickupSlotsService(req.user.branchId);

  res.status(200).json({
    message: "Pickup slots retrieved successfully",
    data: pickupSlots,
  });
});

//get pickup slots by date for admin
export const getAdminPickupSlotsByDateController = asyncHandler(
  async (req, res) => {
    const pickupSlots = await getAdminPickupSlotsByDateService(
      req.user.branchId,
      req.params.date,
    );

    res.status(200).json({
      message: `Pickup slots on ${req.params.date} retrieved successfully`,
      data: pickupSlots,
    });
  },
);

//get pickup slots by date for customer
export const getPublicPickupSlotsByDateController = asyncHandler(
  async (req, res) => {
    const pickupSlots = await getPublicPickupSlotsByDateService(
      req.params.slug,
      req.params.date,
    );

    res.status(200).json({
      message: `Pickup slots of ${req.params.slug} on ${req.params.date} retrieved successfully`,
      data: pickupSlots,
    });
  },
);

//deactivate pickup slot
export const deactivatePickupSlotController = asyncHandler(async (req, res) => {
  const pickupSlot = await deactivatePickupSlotService(
    req.params.slotId,
    req.user.branchId,
  );

  res.status(200).json({
    message: "Pickup slot deactivated successfully",
    data: pickupSlot,
  });
});

//activate pickup slot
export const activatePickupSlotController = asyncHandler(async (req, res) => {
  const pickupSlot = await activatePickupSlotService(
    req.params.slotId,
    req.user.branchId,
  );

  res.status(200).json({
    message: "Pickup slot activated successfully",
    data: pickupSlot,
  });
});
