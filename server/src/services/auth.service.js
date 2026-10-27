import { User } from "../models/user.model.js";
import { comparePassword, createJWT } from "../util/auth.util.js";
import { createError } from "../util/error.util.js";

//login user
export const loginUserService = async (data) => {
  //extract data
  const { email, password } = data;

  //find user
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw createError("User not found", 404);

  //compare password
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw createError("Invalid credentials", 401);

  //check user status
  if (!user.isActive) throw createError("User account is inactive", 403);

  //generate jwt token
  const token = createJWT(user.branch, user._id, user.role);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      branch: user.branch,
    },
    token,
  };
};

//get user profile
export const getUserProfileService = async (userId) => {
  //find user
  const user = await User.findById(userId);

  if (!user) throw createError("User not found", 404);

  return user;
};
