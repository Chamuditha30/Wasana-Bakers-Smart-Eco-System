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
router.get("/all-branches", getAllBranchesController);

//get branch by id
router.get("/branch/:id", getBranchByIdController);

//update exist branch
router.put("/update/:id", updateBranchController);

//deactivate branch
router.put("/deactivate/:id", deactivateBranchController);

//activate branch
router.put("/activate/:id", activateBranchController);

//delete branch
router.delete("/delete/:id", deleteBranchController);

export default router;
