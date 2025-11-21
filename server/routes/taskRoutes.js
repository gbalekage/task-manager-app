const express = require("express");
const auth = require("../middlewares/auth");
const {
  addTask,
  getUserTasks,
  startTask,
  finishTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/add-task", auth, addTask);
router.get("/", auth, getUserTasks);
router.post("/start/:taskId", auth, startTask);
router.put("/edit/:id", auth, updateTask);
router.delete("/delete/:id", auth, deleteTask);
router.post("/finish/:taskId", auth, finishTask);

module.exports = router;
