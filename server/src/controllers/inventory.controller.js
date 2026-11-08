import {
  addInventoryStockService,
  adjustInventoryStockService,
  getAllInventoriesService,
  getInventoryByProductService,
  updateLowStockThresholdService,
} from "../services/inventory.service.js";
import { asyncHandler } from "../util/async.util.js";

//get all inventories
export const getAllInventoriesController = asyncHandler(async (req, res) => {
  const inventories = await getAllInventoriesService(req.user.branchId);

  res.status(200).json({
    message: "Inventories retrieved successfully",
    data: inventories,
  });
});

//get inventory by product
export const getInventoryByProductController = asyncHandler(
  async (req, res) => {
    const inventory = await getInventoryByProductService(
      req.params.productId,
      req.user.branchId,
    );

    res.status(200).json({
      message: "Inventory retrieved successfully",
      data: inventory,
    });
  },
);

//add inventory stock
export const addInventoryStockController = asyncHandler(async (req, res) => {
  const inventory = await addInventoryStockService(
    req.params.productId,
    req.user.branchId,
    req.body.amount,
  );

  res.status(201).json({
    message: "Inventory added successfully",
    data: inventory,
  });
});

//adjust inventory stock
export const adjustInventoryStockController = asyncHandler(async (req, res) => {
  const inventory = await adjustInventoryStockService(
    req.params.productId,
    req.user.branchId,
    req.body.newAvailable,
  );

  res.status(200).json({
    message: "Inventory adjusted successfully",
    data: inventory,
  });
});

//update low stock threshold
export const updateLowStockThresholdController = asyncHandler(
  async (req, res) => {
    const inventory = await updateLowStockThresholdService(
      req.params.productId,
      req.user.branchId,
      req.body.threshold,
    );

    res.status(200).json({
      message: "Inventory low stock threshold updated successfully",
      data: inventory,
    });
  },
);
