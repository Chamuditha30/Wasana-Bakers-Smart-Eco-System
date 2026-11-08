import { asyncHandler } from "../util/async.util.js";
import {
  activateBranchService,
  createBranchService,
  deactivateBranchService,
  deleteBranchService,
  getAllBranchesService,
  getBranchService,
  updateBranchService,
} from "../services/branch.service.js";

//create new branch
export const createBranchController = asyncHandler(async (req, res) => {
  const branch = await createBranchService(req.body);

  res.status(201).json({
    message: "Branch created successfully",
    data: branch,
  });
});

//get all branches
export const getAllBranchesController = asyncHandler(async (req, res) => {
  const branches = await getAllBranchesService();

  res.status(200).json({
    message: "Branches retrieved successfully",
    data: branches,
  });
});

//get branch by id
export const getBranchByIdController = asyncHandler(async (req, res) => {
  const branch = await getBranchService(req.params.branchId);

  res.status(200).json({
    message: "Branch retrieved successfully",
    data: branch,
  });
});

//update exist branch
export const updateBranchController = asyncHandler(async (req, res) => {
  const branch = await updateBranchService(req.params.branchId, req.body);

  res.status(201).json({
    message: "Branch updated successfully",
    data: branch,
  });
});

//deactivate branch
export const deactivateBranchController = asyncHandler(async (req, res) => {
  const branch = await deactivateBranchService(req.params.branchId);

  res.status(201).json({
    message: "Branch deactivated successfully",
    data: branch,
  });
});

//activate branch
export const activateBranchController = asyncHandler(async (req, res) => {
  const branch = await activateBranchService(req.params.branchId);

  res.status(201).json({
    message: "Branch activated successfully",
    data: branch,
  });
});

//delete branch
export const deleteBranchController = asyncHandler(async (req, res) => {
  const branch = await deleteBranchService(req.params.branchId);

  res.status(201).json({
    message: "Branch deleted successfully",
    data: branch,
  });
});
