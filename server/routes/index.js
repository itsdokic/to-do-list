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
    const userId = req.params.id

    const favoriteTasks = await TaskModel.find({user_id: userId, favorite: true})
    const uncompletedTasks = await TaskModel.find({user_id: userId, completed: false, favorite: false})
    const completedTasks = await TaskModel.find({user_id: userId, completed: true, favorite: false})
    
    const tasks = {
      favorite: favoriteTasks,
      uncompleted: uncompletedTasks,
      completed: completedTasks
    }

    res.send(tasks);
   } catch (error) {
     res.status(500).send({ error });
   }
   
});

router.get("/getFilteredTasks", async (req, res) => {
 
  try {
    const userId = req.query.userId
    const category = req.query.category

    const favoriteTasks = await TaskModel.find({user_id: userId, favorite: true, category: category})
    const uncompletedTasks = await TaskModel.find({user_id: userId, completed: false, favorite: false, category: category})
    const completedTasks = await TaskModel.find({user_id: userId, completed: true, favorite: false, category: category})
    
    const tasks = {
      favorite: favoriteTasks,
      uncompleted: uncompletedTasks,
      completed: completedTasks
    }

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
      {
        completed: true,
        favorite: false
      }
    );
    res.send(taskId);
  } catch (error) {
    res.status(500).send(error);
  }

});

router.post("/uncompleteTask", async (req, res) => {
  const taskId = req.body.id;
 
  try {
    await TaskModel.findByIdAndUpdate(
      taskId,
      {completed: false}
    );
    res.send(taskId);
  } catch (error) {
    res.status(500).send(error);
  }

});

router.post("/editTask", async (req, res) => {
  const taskId = req.body.taskId;
  const editedTaskName = req.body.task;
 
  try {
    await TaskModel.findByIdAndUpdate(
      taskId,
      {task: editedTaskName}
    );
    res.send(taskId);
  } catch (error) {
    res.status(500).send(error);
  }

});

router.post("/favorTask", async (req, res) => {
  const taskId = req.body.id;
 
  try {
    await TaskModel.findByIdAndUpdate(
      taskId,
      {favorite: true}
    );
    res.send(taskId);
  } catch (error) {
    res.status(500).send(error);
  }

});

router.post("/unfavorTask", async (req, res) => {
  const taskId = req.body.id;
 
  try {
    await TaskModel.findByIdAndUpdate(
      taskId,
      {favorite: false}
    );
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

export default router;