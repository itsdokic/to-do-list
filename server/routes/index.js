import connectDB from '../database/connectionConfig.js';
import express from 'express';
import TaskModel from '../database/models/task.js';
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
    const tasks = await TaskModel.find({user_id: req.params.id});
    res.send(tasks);
   } catch (error) {
     res.status(500).send({ error });
   }
   
});

router.post("/completeTask", async (req, res) => {
  const taskId = req.body.id;
 
  try {
    await TaskModel.findByIdAndUpdate(
      taskId,
      {completed: true}
    );
    res.send(taskId);
  } catch (error) {
    res.status(500).send(error);
  }

});

router.delete("/removeTask/:id", async (req, res) => {
 
  try {
    await TaskModel.findByIdAndDelete(req.params.id);
    res.send(req.params.id);
   } catch (error) {
     res.status(500).send({ error });
   }
   
});

export default router;