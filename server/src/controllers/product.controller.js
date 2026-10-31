import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
} from "../services/product.service.js";
import { asyncHandler } from "../util/async.util.js";

//create new product
export const createProductController = asyncHandler(async (req, res) => {
  const product = await createProductService(req.user.branchId, req.body);

  res.status(201).json({
    message: "Product created successfully",
    data: product,
  });
});

//get all products
export const getAllProductsController = asyncHandler(async (req, res) => {
  const products = await getAllProductsService(req.user.branchId);

  res.status(200).json({
    message: "Products retrieved successfully",
    data: products,
  });
});

//get product by id
export const getProductByIdController = asyncHandler(async (req, res) => {
  const product = await getProductByIdService(
    req.params.productId,
    req.user.branchId,
  );

  res.status(200).json({
    message: "Product retrieved successfully",
    data: product,
  });
});

//update product
export const updateProductController = asyncHandler(async (req, res) => {
  const product = await updateProductService(
    req.params.productId,
    req.user.branchId,
    req.body,
  );

  res.status(200).json({
    message: "Product updated successfully",
    data: product,
  });
});

//delete product
export const deleteProductController = asyncHandler(async (req, res) => {
  const product = await deleteProductService(
    req.params.productId,
    req.user.branchId,
  );

  res.status(201).json({
    message: "Product deleted successfully",
    data: product,
  });
});
