import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
    },
    task: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    category: {
        type: String,
        required: true,
    },
    recurring: {
        type: String,
        required: true,
    },
    lastRecurred: {
        type: Date,
        required: true,
    }

});

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
