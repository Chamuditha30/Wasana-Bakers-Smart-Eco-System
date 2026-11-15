import {
  activateProductService,
  createProductService,
  deactivateProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
} from "../services/product.service.js";
import { asyncHandler } from "../util/async.util.js";

//create new product
export const createProductController = asyncHandler(async (req, res) => {
  const product = await createProductService(
    req.user.branchId,
    req.body,
    req.files,
  );

  res.status(201).json({
    message: "Product created successfully",
    data: product,
  });
});

//get all products
export const getAllProductsController = asyncHandler(async (req, res) => {
  const products = await getAllProductsService(req.user.branchId, req.query);

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
    req.files,
  );

  res.status(200).json({
    message: "Product updated successfully",
    data: product,
  });
});

//deactivate product
export const deactivateProductController = asyncHandler(async (req, res) => {
  const product = await deactivateProductService(
    req.params.productId,
    req.user.branchId,
  );

  res.status(200).json({
    message: "Product deactivated successfully",
    data: product,
  });
});

//activate product
export const activateProductController = asyncHandler(async (req, res) => {
  const product = await activateProductService(
    req.params.productId,
    req.user.branchId,
  );

  res.status(200).json({
    message: "Product activated successfully",
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
