import {
  activateUserService,
  changePasswordService,
  createUserService,
  deactivateUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  resetPasswordService,
  updateUserService,
} from "../services/user.service.js";
import { asyncHandler } from "../util/async.util.js";

//create new user
export const createUserController = asyncHandler(async (req, res) => {
  const user = await createUserService(req.user.branchId, req.body);

  res.status(201).json({
    message: "User created successfully",
    data: user,
  });
});

//change password
export const changePasswordController = asyncHandler(async (req, res) => {
  const user = await changePasswordService(req.user.userId, req.body);

  res.status(200).json({
    message: "User password changed successfully",
    data: user,
  });
});

//reset password
export const resetPasswordController = asyncHandler(async (req, res) => {
  const user = await resetPasswordService(req.params.userId);

  res.status(200).json({
    message: "User password reset successfully",
    data: user,
  });
});

//get all users
export const getAllUsersController = asyncHandler(async (req, res) => {
  const users = await getAllUsersService(req.user.branchId);

  res.status(200).json({
    message: "Users retrieved successfully",
    data: users,
  });
});

//get user by id
export const getUserByIdController = asyncHandler(async (req, res) => {
  const user = await getUserByIdService(req.params.userId, req.user.branchId);

  res.status(200).json({
    message: "User retrieved successfully",
    data: user,
  });
});

//update user
export const updateUserController = asyncHandler(async (req, res) => {
  const user = await updateUserService(
    req.params.userId,
    req.user.branchId,
    req.body,
  );

  res.status(201).json({
    message: "User updated successfully",
    data: user,
  });
});

//deactivate user
export const deactivateUserController = asyncHandler(async (req, res) => {
  const user = await deactivateUserService(
    req.params.userId,
    req.user.branchId,
  );

  res.status(201).json({
    message: "User deactivated successfully",
    data: user,
  });
});

//activate user
export const activateUserController = asyncHandler(async (req, res) => {
  const user = await activateUserService(req.params.userId, req.user.branchId);

  res.status(201).json({
    message: "User activated successfully",
    data: user,
  });
});

//delete user
export const deleteUserController = asyncHandler(async (req, res) => {
  const user = await deleteUserService(req.params.userId, req.user.branchId);

  res.status(201).json({
    message: "User deleted successfully",
    data: user,
  });
});
