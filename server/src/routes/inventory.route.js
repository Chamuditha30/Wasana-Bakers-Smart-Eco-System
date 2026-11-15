import { Router } from "express";
import {
  addInventoryStockController,
  adjustInventoryStockController,
  getAllInventoriesController,
  getInventoryByProductController,
  updateLowStockThresholdController,
} from "../controllers/inventory.controller.js";
import { requireActive, requireAuth } from "../middlewares/auth.middleware.js";

//initialize router
const router = Router();

//get all inventories
router.get("/", requireAuth, requireActive, getAllInventoriesController);

//get inventory by product
router.get(
  "/:productId",
  requireAuth,
  requireActive,
  getInventoryByProductController,
);

//add inventory stock
router.put(
  "/add/:productId",
  requireAuth,
  requireActive,
  addInventoryStockController,
);

//adjust inventory stock
router.put(
  "/adjust/:productId",
  requireAuth,
  requireActive,
  adjustInventoryStockController,
);

//update low stock threshold
router.put(
  "/update-threshold/:productId",
  requireAuth,
  requireActive,
  updateLowStockThresholdController,
);

export default router;
