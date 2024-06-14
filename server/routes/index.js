import connectDB from "../database/connectionConfig.js";
import express from "express";
import TaskModel from "../database/models/task.js";
import CategoryModel from "../database/models/category.js";

const router = express.Router();

connectDB();

router.post("/addTask", async (req, res) => {
    const task = new TaskModel(req.body);

    try {
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/getTasks/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        const favoriteTasks = await TaskModel.find({
            userId: userId,
            favorite: true,
        });
        const uncompletedTasks = await TaskModel.find({
            userId: userId,
            completed: false,
            favorite: false,
        });
        const completedTasks = await TaskModel.find({
            userId: userId,
            completed: true,
            favorite: false,
        });

        const tasks = {
            favorite: favoriteTasks,
            uncompleted: uncompletedTasks,
            completed: completedTasks,
        };

        res.send(tasks);
    } catch (error) {
        res.status(500).send({ error });
    }
});

router.get("/getFilteredTasks", async (req, res) => {
    try {
        const userId = req.query.userId;
        const category = req.query.category;

        const favoriteTasks = await TaskModel.find({
            userId: userId,
            favorite: true,
            category: category,
        });
        const uncompletedTasks = await TaskModel.find({
            userId: userId,
            completed: false,
            favorite: false,
            category: category,
        });
        const completedTasks = await TaskModel.find({
            userId: userId,
            completed: true,
            favorite: false,
            category: category,
        });

        const tasks = {
            favorite: favoriteTasks,
            uncompleted: uncompletedTasks,
            completed: completedTasks,
        };

        res.send(tasks);
    } catch (error) {
        res.status(500).send({ error });
    }
});

router.post("/completeTask", async (req, res) => {
    const taskId = req.body.id;

    try {
        await TaskModel.findByIdAndUpdate(taskId, {
            completed: true,
            favorite: false,
        });
        res.send(taskId);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/uncompleteTask", async (req, res) => {
    const taskId = req.body.id;

    try {
        await TaskModel.findByIdAndUpdate(taskId, { completed: false });
        res.send(taskId);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/editTask", async (req, res) => {
    const { taskId } = req.body;
    const editedTaskName = req.body.task;

    try {
        await TaskModel.findByIdAndUpdate(taskId, { task: editedTaskName });
        res.send(taskId);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/favorTask", async (req, res) => {
    const taskId = req.body.id;

    try {
        await TaskModel.findByIdAndUpdate(taskId, { favorite: true });
        res.send(taskId);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/unfavorTask", async (req, res) => {
    const taskId = req.body.id;

    try {
        await TaskModel.findByIdAndUpdate(taskId, { favorite: false });
        res.send(taskId);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/removeTask/:id", async (req, res) => {
    try {
        await TaskModel.findByIdAndDelete(req.params.id);
        res.send(req.params);
    } catch (error) {
        res.status(500).send({ error });
    }
});

router.post("/addCategory", async (req, res) => {
    const category = new CategoryModel(req.body);

    try {
        await category.save();
        res.send(category);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/deleteCategory", async (req, res) => {
    const category = req.body.category;
    const { userId } = req.body;

    try {
        await CategoryModel.deleteOne({ category: category, userId: userId });
        res.send(category);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/getCategories/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        const categories = await CategoryModel.find({ userId: userId });

        res.send(categories);
    } catch (error) {
        res.status(500).send({ error });
    }
});

router.post("/recurTask", async (req, res) => {
    const taskId = req.body.id;

    try {
        await TaskModel.findByIdAndUpdate(taskId, {
            completed: false,
            lastRecurred: new Date(),
        });
        res.send(taskId);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
