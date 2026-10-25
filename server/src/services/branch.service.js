import { Branch } from "../models/branch.model.js";
import { createError } from "../util/error.util.js";
import { generateSlug } from "../util/generate.util.js";

//create new branch
export const createBranchService = async (data) => {
  //extract data
  const {
    name,
    address,
    phone,
    openingHours,
    bankDetails,
    paymentMethods,
    pickupSettings,
  } = data;

  //generate slug from name
  const slug = generateSlug(name);

  //check branch exist
  const isExist = await Branch.findOne({ slug });

  if (isExist) throw createError("Branch already exists", 409);

  //save branch
  return Branch.create({
    name,
    slug,
    address,
    phone,
    openingHours,
    bankDetails,
    paymentMethods,
    pickupSettings,
  });
};

//get all branches
export const getAllBranchesService = async () => {
  //find branch
  return Branch.find();
};

//get branch by id
export const getBranchService = async (branchId) => {
  //check branch exist
  const branch = await Branch.findById(branchId);

  if (!branch) throw createError("Branch not found", 404);

  return branch;
};

//update exist branch
export const updateBranchService = async (branchId, data) => {
  //check branch exist
  const branch = await Branch.findById(branchId);

  if (!branch) throw createError("Branch not found", 404);

  //allow only permited fields
  const allowedFields = [
    "name",
    "address",
    "phone",
    "openingHours",
    "bankDetails",
    "paymentMethods",
    "pickupSettings",
    "isActive",
  ];

  const updateData = Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key)),
  );

  //generate slug if name change
  if (updateData.name !== undefined) {
    const slug = generateSlug(updateData.name);

    //check branch/slug exist
    const isExist = await Branch.findOne({
      slug,
      _id: { $ne: branchId },
    });

    if (isExist) throw createError("Branch already exists", 409);

    updateData.slug = slug;
  }

  //update branch
  return Branch.findByIdAndUpdate(branchId, updateData, { new: true });
};

//deactivate branch
export const deactivateBranchService = async (branchId) => {
  //check branch exist
  const branch = await Branch.findById(branchId);

  if (!branch) throw createError("Branch not found", 404);

  //deactivate branch
  branch.isActive = false;

  return branch.save();
};

//activate branch
export const activateBranchService = async (branchId) => {
  //check branch exist
  const branch = await Branch.findById(branchId);

  if (!branch) throw createError("Branch not found", 404);

  //deactivate branch
  branch.isActive = true;

  return branch.save();
};

//delete branch
export const deleteBranchService = async (branchId) => {
  //check branch exist
  const branch = await Branch.findById(branchId);

  if (!branch) throw createError("Branch not found", 404);

  return Branch.findByIdAndDelete(branchId);
};
