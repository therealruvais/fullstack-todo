const {createCustomError} = require('../Middleware/Custom-error')
const Task = require("../models/task");

const asyncWrapper = require('../Middleware/async')


const getTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks})
});


const postTasks = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});

const getSingleTask = asyncWrapper(async (req, res,next) => {
 
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      
      return next(createCustomError(`No task with ${taskID}`, 404));
    }
    res.status(200).json({ task });
});

const updateTasks = asyncWrapper(async (req, res,next) => {
 
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      
       return next(createCustomError(`No task with ${taskID}`, 404));
       
    }
    res.status(200).json({ task });
});

const deleteTasks = asyncWrapper(async (req, res,next) => {
  
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      
       return next(createCustomError(`No task with ${taskID}`, 404));
    }
    res.status(200).json({ task });
});

module.exports = { getTasks, postTasks, updateTasks, deleteTasks,getSingleTask };
