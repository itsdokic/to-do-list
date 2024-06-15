import TaskModel from "../database/models/task.js";

export const addTask = async (taskData) => {
    const task = new TaskModel(taskData);
    return await task.save();
};

export const getTasks = async (userId) => {
    const tasks = await TaskModel.aggregate([
        { $match: { userId: Number(userId) } },
        {
            $facet: {
                favorite: [{ $match: { favorite: true } }],
                uncompleted: [
                    { $match: { completed: false, favorite: false } },
                ],
                completed: [{ $match: { completed: true, favorite: false } }],
            },
        },
    ]);

    return tasks[0];
};

export const getTasksByCategory = async (userId, category) => {
    const tasks = await TaskModel.aggregate([
        { $match: { userId: Number(userId), category } },
        {
            $facet: {
                favorite: [{ $match: { favorite: true } }],
                uncompleted: [
                    { $match: { completed: false, favorite: false } },
                ],
                completed: [{ $match: { completed: true, favorite: false } }],
            },
        },
    ]);

    return tasks[0];
};

export const updateTaskStatus = async (taskId, updates) => {
    return await TaskModel.findByIdAndUpdate(taskId, updates);
};

export const deleteTask = async (taskId) => {
    return await TaskModel.findByIdAndDelete(taskId);
};
