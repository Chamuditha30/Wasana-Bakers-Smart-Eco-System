import { Router } from "express";
import {
  activateUserController,
  changePasswordController,
  createUserController,
  deactivateUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  resetPasswordController,
  updateUserController,
} from "../controllers/user.controller.js";
import {
  requireActive,
  requireAdmin,
  requireAuth,
} from "../middlewares/auth.middleware.js";

//initialize router
const router = Router();

//create new user
router.post(
  "/create",
  requireAuth,
  requireActive,
  requireAdmin,
  createUserController,
);

//change password
router.post(
  "/change-password",
  requireAuth,
  requireActive,
  changePasswordController,
);

//reset password
router.post(
  "/reset-password/:userId",
  requireAuth,
  requireActive,
  requireAdmin,
  resetPasswordController,
);

//get all users
router.get(
  "/",
  requireAuth,
  requireActive,
  requireAdmin,
  getAllUsersController,
);

//get all users
router.get(
  "/:userId",
  requireAuth,
  requireActive,
  requireAdmin,
  getUserByIdController,
);

//update user
router.put(
  "/update/:userId",
  requireAuth,
  requireActive,
  requireAdmin,
  updateUserController,
);

//deactivate user
router.put(
  "/deactivate/:userId",
  requireAuth,
  requireActive,
  requireAdmin,
  deactivateUserController,
);

//activate user
router.put(
  "/activate/:userId",
  requireAuth,
  requireActive,
  requireAdmin,
  activateUserController,
);

//delete user
router.delete(
  "/delete/:userId",
  requireAuth,
  requireActive,
  requireAdmin,
  deleteUserController,
);

export default router;
