const express = require("express");

//init Routes
const tasksRoutes = express.Router();

//controller
const {
  getAllTasks,
  getTaskStatus,
  createTask,
  updateTask,
  deleteTask,
} = require("../controller/task.controller");

//comprobar si existe task
const { taskExist } = require("../middlewares/taks.exist");

//validatorTask
const { validatorTask } = require("../middlewares/valitador.taks");

//comprobar si el status existe
const { comparedStatus } = require("../middlewares/statusCompared.task");

tasksRoutes.get("/", getAllTasks);
tasksRoutes.get("/:status", /* comparedStatus, */ getTaskStatus);
tasksRoutes.post("/", validatorTask, createTask);
tasksRoutes.patch("/:id", taskExist, updateTask);
tasksRoutes.delete("/:id", taskExist, deleteTask);

module.exports = { tasksRoutes };
