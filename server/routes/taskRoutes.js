import express from "express";
import * as taskController from "../controllers/taskController.js";

const router = express.Router();

router.post("/addTask", taskController.addTask);
router.get("/getTasks", taskController.getTasks);
router.post("/completeTask", taskController.completeTask);
router.post("/uncompleteTask", taskController.uncompleteTask);
router.post("/editTask", taskController.editTask);
router.post("/favorTask", taskController.favorTask);
router.post("/unfavorTask", taskController.unfavorTask);
router.delete("/deleteTask/:id", taskController.deleteTask);
router.post("/recurTask", taskController.recurTask);

export default router;
