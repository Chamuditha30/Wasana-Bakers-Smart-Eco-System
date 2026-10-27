import { Router } from "express";
import {
  activateBranchController,
  createBranchController,
  deactivateBranchController,
  deleteBranchController,
  getAllBranchesController,
  getBranchByIdController,
  updateBranchController,
} from "../controllers/branch.controller.js";

//initialize router
const router = Router();

//create new branch
router.post("/create", createBranchController);

//get all branches
router.get("/", getAllBranchesController);

//get branch by id
router.get("/:branchId", getBranchByIdController);

//update exist branch
router.put("/update/:branchId", updateBranchController);

//deactivate branch
router.put("/deactivate/:branchId", deactivateBranchController);

//activate branch
router.put("/activate/:branchId", activateBranchController);

//delete branch
router.delete("/delete/:branchId", deleteBranchController);

export default router;
