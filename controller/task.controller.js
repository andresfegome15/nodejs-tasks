const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");
const { catchAsync } = require("../utils/catchAsync.utils");

const getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.findAll({
    attributes: ["id", "title", "status"],
    include: [{ model: User }],
  });
  res.status(200).json({
    status: "done",
    tasks,
  });
});

const getTaskStatus = catchAsync(async (req, res, next) => {
  const { status } = req.params;
  const statates = ["active", "late", "completed", "cancelled"];
  let compared = false;
  for (let i = 0; i <= statates.length; i++) {
    if (statates[i] === status) {
      compared = true;
    }
  }
  if (compared) {
    const tasks = await Task.findAll({ where: { status } });
    res.status(200).json({
      status: "done",
      tasks,
    });
  } else {
    res
      .status(400)
      .json({ status: "fail", message: `no found parameter ${status}` });
  }
});

const createTask = catchAsync(async (req, res, next) => {
  const { title, userId, limitDate } = req.body;
  const tasks = await Task.create({ title, userId, limitDate });
  res.status(201).json({
    status: "done",
    tasks,
  });
});

const updateTask = catchAsync(async (req, res, next) => {
  const { task } = req;
  const limit = task.limitDate;
  const { finishDate } = req.body;
  let status = "";

  if (Date.parse(limit) > Date.parse(finishDate)) {
    status = "completed";
  } else if (Date.parse(finishDate) > Date.parse(limit)) {
    status = "late";
  }
  await task.update({ finishDate, status });
  res.status(204).json({ status: "done" });
});

const deleteTask = catchAsync(async (req, res, next) => {
  const { task } = req;
  await task.update({ status: "cancelled" });
  res.status(204).json({ status: "task cancelled" });
});

module.exports = {
  getAllTasks,
  getTaskStatus,
  createTask,
  updateTask,
  deleteTask,
};
