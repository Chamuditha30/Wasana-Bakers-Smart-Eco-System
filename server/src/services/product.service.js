import { startSession } from "mongoose";
import { Product } from "../models/product.model.js";
import { createError } from "../util/error.util.js";
import { generateSlug } from "../util/generate.util.js";
import {
  createInventoryService,
  deleteInventoryService,
} from "./inventory.service.js";
import { validateProductPricing } from "../util/product.util.js";
import { deleteImages, uploadImages } from "./cloudinary.service.js";
import { Inventory } from "../models/inventory.model.js";

//create new product
export const createProductService = async (branch, data, files = []) => {
  //validate images
  if (!files || files.length === 0)
    throw createError("At least one image is required", 400);

  //initialize upload images
  let uploadedImages = [];

  //initialize transaction session
  let session;

  try {
    //upload images before database transaction
    uploadedImages = await uploadImages(files);

    session = await startSession();

    //initialize product
    let product;

    //start transaction session
    await session.withTransaction(async () => {
      //extract data
      const {
        name,
        category,
        description,
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
        images: uploadedImages,
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
  } catch (error) {
    //delete uploaded images if database operation fails
    await deleteImages(uploadedImages).catch(console.error);

    throw error;
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

  //get inventory for these products
  const inventories = await Inventory.find({
    product: { $in: products.map((product) => product._id) },
    branch,
  });

  //attach inventory to each product
  const productsWithInventory = products.map((product) => ({
    ...product.toObject(),
    inventory:
      inventories.find(
        (inventory) => inventory.product.toString() === product._id.toString(),
      ) || null,
  }));

  return {
    products: productsWithInventory,
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
export const updateProductService = async (_id, branch, data, files = []) => {
  //allowed fields
  const allowedFields = [
    "name",
    "category",
    "description",
    "pricingType",
    "pricePerKg",
    "price",
    "weight",
  ];

  const updateData = Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key)),
  );

  //find existing product
  const product = await Product.findOne({ _id, branch });

  if (!product) throw createError("Product not found", 404);

  //keep original images
  const oldImages = [...product.images];

  //check whether images are being updated
  const hasImageChanges =
    data.existingImageIds !== undefined || files.length > 0;

  //reject empty updates
  if (Object.keys(updateData).length === 0 && !hasImageChanges)
    throw createError("No valid fields provided", 400);

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

  //Initialize existing images
  let existingImages = oldImages;

  //process image changes
  if (hasImageChanges) {
    let existingImageIds;

    try {
      existingImageIds =
        data.existingImageIds !== undefined
          ? JSON.parse(data.existingImageIds)
          : oldImages.map((image) => image.publicId);
    } catch {
      throw createError("Invalid existing image data", 400);
    }

    //validate image ids
    if (
      !Array.isArray(existingImageIds) ||
      !existingImageIds.every((id) => typeof id === "string")
    )
      throw createError("Invalid existing image data", 400);

    //get existing images to keep
    existingImages = oldImages.filter((image) =>
      existingImageIds.includes(image.publicId),
    );

    //validate image IDs
    if (
      existingImages.length !== existingImageIds.length ||
      new Set(existingImageIds).size !== existingImageIds.length
    ) {
      throw createError("Invalid product images", 400);
    }
  }

  //upload new images
  let uploadedImages = [];

  try {
    if (files.length > 0) {
      uploadedImages = await uploadImages(files);
    }

    //combine existing and new images
    const finalImages = [...existingImages, ...uploadedImages];

    //validate image count
    if (hasImageChanges) {
      if (finalImages.length === 0)
        throw createError("At least one image is required", 400);

      if (finalImages.length > 5)
        throw createError("Maximum 5 images allowed", 400);
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

    //update images
    if (hasImageChanges) product.images = finalImages;

    //remove irrelevant pricing field
    if (product.pricingType === "by_weight") {
      product.price = undefined;
    } else {
      product.pricePerKg = undefined;
    }

    //update product
    await product.save();
  } catch (error) {
    //remove newly uploaded images if update fails
    await deleteImages(uploadedImages).catch(console.error);

    throw error;
  }

  //identify removed existing images
  const removedImages = oldImages.filter(
    (image) =>
      !existingImages.some(
        (keptImage) => keptImage.publicId === image.publicId,
      ),
  );

  //delete removed images from Cloudinary
  if (removedImages.length > 0) {
    try {
      await deleteImages(removedImages);
    } catch (error) {
      console.error("Cloudinary image deletion failed:", error);
    }
  }

  return product;
};

//deactivate product
export const deactivateProductService = async (_id, branch) => {
  //find product
  const product = await Product.findOne({ _id, branch });

  if (!product) throw createError("Product not found", 404);

  //deactivate product
  product.isAvailable = false;

  return product.save();
};

//activate product
export const activateProductService = async (_id, branch) => {
  //find product
  const product = await Product.findOne({ _id, branch });

  if (!product) throw createError("Product not found", 404);

  //deactivate product
  product.isAvailable = true;

  return product.save();
};

//delete product
export const deleteProductService = async (_id, branch) => {
  //initialize transaction session
  let session;

  try {
    session = await startSession();

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

    //delete product images from Cloudinary
    if (product.images.length > 0) {
      await deleteImages(product.images);
    }

    return product;
  } finally {
    //end transaction session
    await session.endSession();
  }
};
