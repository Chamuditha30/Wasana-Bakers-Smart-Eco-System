import { Router } from "express";
import {
  activateProductController,
  createProductController,
  deactivateProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from "../controllers/product.controller.js";
import {
  requireActive,
  requireAdmin,
  requireAuth,
} from "../middlewares/auth.middleware.js";
import upload from "../middlewares/uploadMiddleware.js";

//initialize router
const router = Router();

//create new product
router.post(
  "/create",
  requireAuth,
  requireActive,
  upload.array("images", 5),
  createProductController,
);

//get all products
router.get("/", requireAuth, requireActive, getAllProductsController);

//get product by id
router.get("/:productId", requireAuth, requireActive, getProductByIdController);

//update product
router.put(
  "/update/:productId",
  requireAuth,
  requireActive,
  upload.array("images", 5),
  updateProductController,
);

//deactivate product
router.put(
  "/deactivate/:productId",
  requireAuth,
  requireActive,
  deactivateProductController,
);

//activate product
router.put(
  "/activate/:productId",
  requireAuth,
  requireActive,
  activateProductController,
);

//delete product
router.delete(
  "/delete/:productId",
  requireAuth,
  requireActive,
  requireAdmin,
  deleteProductController,
);

export default router;
