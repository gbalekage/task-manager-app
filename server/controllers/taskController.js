const Task = require("../models/Task");
const HttpError = require("../utils/httpError");
const User = require("../models/User");

const addTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title } = req.body;
    if (!title) {
      return next(new HttpError("Please enter the task title", 400));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    const newTask = await Task.create({
      title,
      user: user._id,
    });

    res.status(201).json({
      message: "New Task added",
      task: newTask,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Server error", 500));
  }
};

const getUserTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error(error);
    return next(new HttpError("Server error", 500));
  }
};

const startTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return next(new HttpError("Task not found", 404));
    }

    if (task.user.toString() !== userId) {
      return next(new HttpError("You cannot start this task", 403));
    }

    const activeTask = await Task.findOne({ user: userId, started: true });
    if (activeTask) {
      return next(
        new HttpError(
          "You already have a task in progress. Complete it before starting a new one.",
          400
        )
      );
    }

    task.started = true;
    task.startedAt = new Date();
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task started successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    next(new HttpError("Failed to start task", 500));
  }
};

const finishTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return next(new HttpError("Task not found", 404));
    }

    if (task.user.toString() !== userId) {
      return next(new HttpError("You cannot end this task", 403));
    }

    if (!task.started || !task.startedAt) {
      return next(new HttpError("Task has not been started yet", 400));
    }

    const now = new Date();
    const elapsedMinutes = Math.floor((now - task.startedAt) / 1000 / 60);

    task.timeSpent += elapsedMinutes;
    task.started = false;
    task.startedAt = null;
    task.isDone = true;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task completed successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    next(new HttpError("Failed to finish task", 500));
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return next(new HttpError("Task not found", 404));
    }

    Object.keys(updates).forEach((key) => {
      task[key] = updates[key];
    });

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return next(new HttpError("Server error", 500));
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return next(new HttpError("Task not found", 404));
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return next(new HttpError("Server error", 500));
  }
};

module.exports = {
  addTask,
  getUserTasks,
  startTask,
  finishTask,
  updateTask,
  deleteTask,
};
