import * as taskService from "../services/taskService.js";

export const addTask = async (req, res) => {
    try {
        const task = await taskService.addTask(req.body);
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
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
        res.status(500).send({ error });
    }
};

export const completeTask = async (req, res) => {
    try {
        const taskId = req.body.id;
        await taskService.updateTaskStatus(taskId, {
            completed: true,
            favorite: false,
        });
        res.send(taskId);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const uncompleteTask = async (req, res) => {
    try {
        const taskId = req.body.id;
        await taskService.updateTaskStatus(taskId, { completed: false });
        res.send(taskId);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const editTask = async (req, res) => {
    try {
        const { taskId, task } = req.body;
        await taskService.updateTaskStatus(taskId, { task });
        res.send(taskId);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const favorTask = async (req, res) => {
    try {
        const taskId = req.body.id;
        await taskService.updateTaskStatus(taskId, { favorite: true });
        res.send(taskId);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const unfavorTask = async (req, res) => {
    try {
        const taskId = req.body.id;
        await taskService.updateTaskStatus(taskId, { favorite: false });
        res.send(taskId);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteTask = async (req, res) => {
    try {
        await taskService.deleteTask(req.params.id);
        res.send(req.params.id);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const recurTask = async (req, res) => {
    try {
        const taskId = req.body.id;
        await taskService.updateTaskStatus(taskId, {
            completed: false,
            lastRecurred: new Date(),
        });
        res.send(req.body.id);
    } catch (error) {
        res.status(500).send(error);
    }
};
