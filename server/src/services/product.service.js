import { Product } from "../models/product.model.js";
import { createError } from "../util/error.util.js";
import { generateSlug } from "../util/generate.util.js";

//create new product
export const createProductService = async (branch, data) => {
  //extract data
  const { name, category, description, images, sizes, isAvailable } = data;

  //generate base slug
  const baseSlug = generateSlug(name);

  //generate unique slug if it alraedy exists
  let slug = baseSlug;
  let count = 1;

  while (await Product.findOne({ slug })) {
    count++;
    slug = `${baseSlug}-${count}`;
  }

  //create product
  const product = await Product.create({
    name,
    slug,
    category,
    description,
    images,
    sizes,
    isAvailable,
    branch,
  });

  return product;
};

//get all products
export const getAllProductsService = async (branch) => {
  //find products
  return Product.find({ branch });
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
    "sizes",
    "isAvailable",
  ];

  const updateData = Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key)),
  );

  //reject empty updates
  if (Object.keys(updateData).length === 0) {
    throw createError("No valid fields provided", 400);
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

  //update product
  const product = await Product.findOneAndUpdate(
    { _id, branch },
    { $set: updateData },
    { new: true, runValidators: true },
  );

  if (!product) throw createError("Product not found", 404);

  return product;
};

//delete product
export const deleteProductService = async (_id, branch) => {
  //find product and delete
  const product = await Product.findOneAndDelete({ _id, branch });

  if (!product) throw createError("Product not found", 404);

  return product;
};
