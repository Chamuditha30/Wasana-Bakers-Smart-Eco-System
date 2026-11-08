import { Inventory } from "../models/inventory.model.js";
import { createError } from "../util/error.util.js";

//create new inventory
export const createInventoryService = async (branch, product, session) => {
  //initialize inventory unit
  const stockUnit = product.pricingType === "by_weight" ? "grams" : "pieces";

  //initialize low stock threshold
  const lowStockThreshold = product.pricingType === "by_weight" ? 5000 : 5;

  //create inventory
  const inventory = new Inventory({
    lowStockThreshold,
    stockUnit,
    product: product._id,
    branch,
  });

  //save inventory
  return inventory.save({ session });
};

//get all inventories
export const getAllInventoriesService = async (branch) => {
  return Inventory.find({ branch }).populate(
    "product",
    "name category pricingType pricePerKg price",
  );
};

//get inventory by product
export const getInventoryByProductService = async (product, branch) => {
  const inventory = await Inventory.findOne({ product, branch }).populate(
    "product",
    "name category pricingType pricePerKg price",
  );

  if (!inventory) createError("Inventory not found", 404);

  return inventory;
};

//add inventory stock
export const addInventoryStockService = async (product, branch, amount) => {
  //validate stock amount
  if (amount <= 0) throw createError("Invalid stock amount", 400);

  //find inventory
  const inventory = await Inventory.findOne({ product, branch });

  if (!inventory) createError("Inventory not found", 404);

  //increase available stock
  inventory.available += amount;

  //save inventory
  await inventory.save();

  return inventory;
};

//adjust inventory stock
export const adjustInventoryStockService = async (
  product,
  branch,
  newAvailable,
) => {
  //validate stock amount
  if (newAvailable < 0) throw createError("Invalid stock amount", 400);

  //find inventory
  const inventory = await Inventory.findOne({ product, branch });

  if (!inventory) throw createError("Inventory not found", 404);

  //update available stock
  inventory.available = newAvailable;

  //save inventory
  await inventory.save();

  return inventory;
};

//update low stock threshold
export const updateLowStockThresholdService = async (
  product,
  branch,
  threshold,
) => {
  //validate threshold
  if (threshold < 0) throw createError("Invalid low stock threshold", 400);

  //find inventory
  const inventory = await Inventory.findOne({ product, branch });

  if (!inventory) throw createError("Inventory not found", 404);

  //update threshold
  inventory.lowStockThreshold = threshold;

  //save inventory
  await inventory.save();

  return inventory;
};

//delete inventory
export const deleteInventoryService = async (product, branch, session) => {
  //find inventory
  const inventory = await Inventory.findOne({
    product,
    branch,
  }).session(session);

  if (!inventory) throw createError("Inventory not found", 404);

  //check available and reserved stock
  if (inventory.available > 0 || inventory.reserved > 0)
    throw createError(
      "Cannot delete inventory because stock is remaining",
      400,
    );

  //delete inventory
  await Inventory.deleteOne({ _id: inventory._id }, { session });

  return inventory;
};
