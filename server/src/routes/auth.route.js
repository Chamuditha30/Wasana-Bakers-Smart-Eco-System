import { Router } from "express";
import {
  getUserProfileController,
  loginUserController,
  logoutUserController,
} from "../controllers/auth.controller.js";
import { requireActive, requireAuth } from "../middlewares/auth.middleware.js";

//initialize router
const router = Router();

//login user
router.post("/login", loginUserController);

//get user profile
router.get("/profile", requireAuth, requireActive, getUserProfileController);

//logout user
router.post("/logout", logoutUserController);

export default router;
