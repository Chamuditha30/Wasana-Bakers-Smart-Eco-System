import { asyncHandler } from "../util/async.util.js";
import {
  getUserProfileService,
  loginUserService,
} from "../services/auth.service.js";

//login user
export const loginUserController = asyncHandler(async (req, res) => {
  const { user, token } = await loginUserService(req.body);

  //set ccokie
  res.cookie("session", token, {
    httpOnly: true,
    secure: false, //true in production (HTTPS)
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, //1 day
  });

  res.status(200).json({
    message: "User login successfully",
    data: user,
  });
});

//get user profile
export const getUserProfileController = asyncHandler(async (req, res) => {
  const user = await getUserProfileService(req.user.userId);

  res.status(200).json({
    message: "Profile retrieved successfully",
    data: user,
  });
});

//logout user
export const logoutUserController = asyncHandler(async (req, res) => {
  res.clearCookie("session", {
    httpOnly: true,
    secure: false, //true in production (HTTPS)
    sameSite: "lax",
  });

  res.status(200).json({
    message: "User logged out successfully",
  });
});
