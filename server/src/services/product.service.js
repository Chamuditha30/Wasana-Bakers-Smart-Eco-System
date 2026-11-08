import { startSession } from "mongoose";
import { Product } from "../models/product.model.js";
import { createError } from "../util/error.util.js";
import { generateSlug } from "../util/generate.util.js";
import {
  createInventoryService,
  deleteInventoryService,
} from "./inventory.service.js";
import { validateProductPricing } from "../util/product.util.js";

//create new product
export const createProductService = async (branch, data) => {
  //initialize transaction session
  const session = await startSession();

  try {
    //initialize product
    let product;

    //start transaction session
    await session.withTransaction(async () => {
      //extract data
      const {
        name,
        category,
        description,
        images,
        pricingType,
        pricePerKg,
        price,
        weight,
        isAvailable,
      } = data;

      //validate pricing
      validateProductPricing({ pricingType, pricePerKg, price });

      //generate base slug
      const baseSlug = generateSlug(name);

      //generate unique slug if it alraedy exists
      let slug = baseSlug;
      let count = 1;

      while (await Product.findOne({ slug }).session(session)) {
        count++;
        slug = `${baseSlug}-${count}`;
      }

      //create product
      product = new Product({
        name,
        slug,
        category,
        description,
        images,
        pricingType,
        pricePerKg: pricingType === "by_weight" ? pricePerKg : undefined,
        price: pricingType === "fixed" ? price : undefined,
        weight,
        isAvailable,
        branch,
      });

      await product.save({ session });

      //create inventory
      await createInventoryService(branch, product, session);
    });

    return product;
  } finally {
    //end transaction session
    await session.endSession();
  }
};

//get all products
export const getAllProductsService = async (branch, filters) => {
  //extract filters
  const {
    search,
    category,
    pricingType,
    isAvailable,
    page = 1,
    limit = 20,
  } = filters;

  //initialize query with branch
  const query = { branch };

  //search by product name
  if (search && search.trim()) {
    query.name = {
      $regex: search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      $options: "i",
    };
  }

  //filter by category
  if (category) query.category = category;

  // filter by pricing type
  if (pricingType) {
    if (!["by_weight", "fixed"].includes(pricingType))
      throw createError("Invalid pricing type", 400);

    query.pricingType = pricingType;
  }

  //filter by availability
  if (isAvailable !== undefined) {
    if (!["true", "false"].includes(isAvailable))
      throw createError("Invalid availability value", 400);

    query.isAvailable = isAvailable === "true";
  }

  //pagination
  const currentPage = Math.max(1, Number(page) || 1);
  const perPage = Math.min(50, Math.max(1, Number(limit) || 20));

  const skip = (currentPage - 1) * perPage;

  //get products and total count
  const [products, total] = await Promise.all([
    Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(perPage),

    Product.countDocuments(query),
  ]);

  return {
    products,
    total,
    page: currentPage,
    limit: perPage,
    totalPages: Math.ceil(total / perPage),
  };
};

//get product by id
export const getProductByIdService = async (_id, branch) => {
  //find product
  const product = await Product.findOne({ _id, branch });

  if (!product) throw createError("Product not found", 404);

  return product;
};

//update product
export const updateProductService = async (_id, branch, data) => {
  //allowed fields
  const allowedFields = [
    "name",
    "category",
    "description",
    "images",
    "pricingType",
    "pricePerKg",
    "price",
    "weight",
    "isAvailable",
  ];

  const updateData = Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key)),
  );

  //reject empty updates
  if (Object.keys(updateData).length === 0) {
    throw createError("No valid fields provided", 400);
  }

  // find existing product
  const product = await Product.findOne({ _id, branch });

  if (!product) throw createError("Product not found", 404);

  //prevent pricing type changes
  if (
    updateData.pricingType !== undefined &&
    updateData.pricingType !== product.pricingType
  ) {
    throw createError(
      "Pricing type cannot be changed after product creation",
      400,
    );
  }

  //regenerate slug if name changes
  if (updateData.name !== undefined) {
    const baseSlug = generateSlug(updateData.name);

    let slug = baseSlug;
    let count = 1;

    while (
      await Product.findOne({
        slug,
        _id: { $ne: _id },
      })
    ) {
      count++;
      slug = `${baseSlug}-${count}`;
    }

    updateData.slug = slug;
  }

  //get final pricing information
  const finalPricing = {
    pricingType: updateData.pricingType ?? product.pricingType,

    pricePerKg:
      updateData.pricePerKg !== undefined
        ? updateData.pricePerKg
        : product.pricePerKg,

    price: updateData.price !== undefined ? updateData.price : product.price,
  };

  //validate final pricing information
  validateProductPricing(finalPricing);

  //apply updates
  Object.assign(product, updateData);

  //remove irrelevant pricing field
  if (product.pricingType === "by_weight") {
    product.price = undefined;
  } else {
    product.pricePerKg = undefined;
  }

  //update product
  await product.save();

  return product;
};

//delete product
export const deleteProductService = async (_id, branch) => {
  //initialize transaction session
  const session = await startSession();

  try {
    //initialize product
    let product;

    await session.withTransaction(async () => {
      //find product and delete
      product = await Product.findOne({
        _id,
        branch,
      }).session(session);

      if (!product) throw createError("Product not found", 404);

      //delete inventory
      await deleteInventoryService(_id, branch, session);

      //delete product
      product = await Product.findOneAndDelete({ _id, branch }, { session });
    });

    return product;
  } finally {
    //end transaction session
    await session.endSession();
  }
};
