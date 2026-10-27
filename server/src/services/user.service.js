import { User } from "../models/user.model.js";
import { comparePassword } from "../util/auth.util.js";
import { createError } from "../util/error.util.js";
import { generateTemporaryPassword } from "../util/generate.util.js";

//create new user
export const createUserService = async (branch, data) => {
  //extract data
  const { name, email, role } = data;

  //check user exist
  const isExist = await User.findOne({ email });

  if (isExist) throw createError("User already exists", 409);

  //generate temporary password
  const temporaryPassword = generateTemporaryPassword();

  //save user
  const user = await User.create({
    name,
    email,
    password: temporaryPassword,
    role,
    branch,
  });

  return { user, temporaryPassword };
};

//change password
export const changePasswordService = async (userId, data) => {
  //extract data
  const { currentPassword, newPassword } = data;

  //find user
  const user = await User.findById(userId).select("+password");

  if (!user) throw createError("User not found", 404);

  //check password
  const isMatch = await comparePassword(currentPassword, user.password);

  if (!isMatch) throw createError("Current password is incorrect", 401);

  user.password = newPassword;
  user.mustChangePassword = false;

  return user.save();
};

//reset password
export const resetPasswordService = async (userId) => {
  //find user
  const user = await User.findById(userId).select("+password");

  if (!user) throw createError("User not found", 404);

  //generate temporary password
  const temporaryPassword = generateTemporaryPassword();

  user.password = temporaryPassword;
  user.mustChangePassword = true;

  await user.save();

  return temporaryPassword;
};

//get all users
export const getAllUsersService = async (branch) => {
  //find users
  return User.find({ branch });
};

//get user by id
export const getUserByIdService = async (_id, branch) => {
  //find user
  const user = await User.findOne({ _id, branch });

  if (!user) throw createError("User not found", 404);

  return user;
};

//update user
export const updateUserService = async (_id, branch, data) => {
  //allow only permitted fields
  const allowedFields = ["name", "email", "role"];

  const updateData = Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key)),
  );

  //update user
  const user = await User.findOneAndUpdate(
    { _id, branch },
    { $set: updateData },
    { new: true, runValidators: true },
  );

  if (!user) throw createError("User not found", 404);

  return user;
};

//deactivate user
export const deactivateUserService = async (_id, branch) => {
  //find user
  const user = await User.findOne({ _id, branch });

  if (!user) throw createError("User not found", 404);

  //deactivate user
  user.isActive = false;

  return user.save();
};

//activate user
export const activateUserService = async (_id, branch) => {
  //find user
  const user = await User.findOne({ _id, branch });

  if (!user) throw createError("User not found", 404);

  //activate user
  user.isActive = true;

  return user.save();
};

//delete user
export const deleteUserService = async (_id, branch) => {
  //find user and delete
  const user = await User.findOneAndDelete({ _id, branch });

  if (!user) throw createError("User not found", 404);

  return user;
};
