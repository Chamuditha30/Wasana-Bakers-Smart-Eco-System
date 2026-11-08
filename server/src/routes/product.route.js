import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from "../controllers/product.controller.js";
import { requireActive, requireAuth } from "../middlewares/auth.middleware.js";

//initialize router
const router = Router();

//create new product
router.post("/create", requireAuth, requireActive, createProductController);

//get all products
router.get("/", requireAuth, requireActive, getAllProductsController);

//get product by id
router.get("/:productId", requireAuth, requireActive, getProductByIdController);

//update product
router.put(
  "/update/:productId",
  requireAuth,
  requireActive,
  updateProductController,
);

//delete product
router.delete(
  "/delete/:productId",
  requireAuth,
  requireActive,
  deleteProductController,
);

export default router;
