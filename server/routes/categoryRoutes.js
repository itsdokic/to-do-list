import express from "express";
import * as categoryController from "../controllers/categoryController.js";

const router = express.Router();

router.get("/getCategories/:id", categoryController.getCategories);
router.post("/addCategory", categoryController.addCategory);
router.post("/deleteCategory", categoryController.deleteCategory);

export default router;
