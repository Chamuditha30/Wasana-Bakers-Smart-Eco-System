import { Router } from "express";
import {
  activatePickupSlotController,
  deactivatePickupSlotController,
  generatePickupSlotsController,
  getAdminPickupSlotsByDateController,
  getAllPickupSlotsController,
  getPublicPickupSlotsByDateController,
} from "../controllers/pickupSlot.controller.js";
import {
  requireActive,
  requireAdmin,
  requireAuth,
} from "../middlewares/auth.middleware.js";

//initialize router
const router = Router();

//generate pickup slots
router.post(
  "/create",
  requireAuth,
  requireActive,
  requireAdmin,
  generatePickupSlotsController,
);

//get all pickup dates for admin
router.get(
  "/",
  requireAuth,
  requireActive,
  requireAdmin,
  getAllPickupSlotsController,
);

//get pickup slots by date for admin
router.get(
  "/date/:date",
  requireAuth,
  requireActive,
  requireAdmin,
  getAdminPickupSlotsByDateController,
);

//get pickup slots by date for customer
router.get(
  "/public/:slug/date/:date",
  requireAuth,
  requireActive,
  getPublicPickupSlotsByDateController,
);

//deactivate pickup slot
router.put(
  "/deactivate/:slotId",
  requireAuth,
  requireActive,
  deactivatePickupSlotController,
);

//activate pickup slot
router.put(
  "/activate/:slotId",
  requireAuth,
  requireActive,
  activatePickupSlotController,
);

export default router;
