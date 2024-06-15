import * as taskService from "../services/taskService.js";

export const addTask = async (req, res) => {
    try {
        const task = await taskService.addTask(req.body);
        res.send("Task added successfully");
    } catch (error) {
        res.status(500).send("Error while adding task");
    }
};

export const getTasks = async (req, res) => {
    try {
        const userId = req.query.userId;
        const category = req.query.category;
        let tasks;

        if (category === "All") {
            tasks = await taskService.getTasks(userId);
        } else {
            tasks = await taskService.getTasksByCategory(userId, category);
        }
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const completeTask = async (req, res) => {
    try {
        const taskId = req.body.id;
        await taskService.updateTaskStatus(taskId, {
            completed: true,
            favorite: false,
        });
        res.send("Task completed successfully");
    } catch (error) {
        res.status(500).send("Error while completing task");
    }
};

export const uncompleteTask = async (req, res) => {
    try {
        const taskId = req.body.id;
        await taskService.updateTaskStatus(taskId, { completed: false });
        res.send("Task uncompleted successfully");
    } catch (error) {
        res.status(500).send("Error while uncompleting task");
    }
};

export const editTask = async (req, res) => {
    try {
        const { taskId, task } = req.body;
        await taskService.updateTaskStatus(taskId, { task });
        res.send("Task edited successfully");
    } catch (error) {
        res.status(500).send("Error while editing task");
    }
};

export const favorTask = async (req, res) => {
    try {
        const taskId = req.body.id;
        await taskService.updateTaskStatus(taskId, { favorite: true });
        res.send("Task favorited successfully");
    } catch (error) {
        res.status(500).send("Error while favoriting task");
    }
};

export const unfavorTask = async (req, res) => {
    try {
        const taskId = req.body.id;
        await taskService.updateTaskStatus(taskId, { favorite: false });
        res.send("Task unfavorited successfully");
    } catch (error) {
        res.status(500).send("Error while unfavoriting task");
    }
};

export const deleteTask = async (req, res) => {
    try {
        await taskService.deleteTask(req.params.id);
        res.send("Task deleted successfully");
    } catch (error) {
        res.status(500).send("Error while deleting task");
    }
};

export const recurTask = async (req, res) => {
    try {
        const taskId = req.body.id;
        await taskService.updateTaskStatus(taskId, {
            completed: false,
            lastRecurred: new Date(),
        });
        res.send("Task recurred successfully");
    } catch (error) {
        res.status(500).send("Error while recurring task");
    }
};
