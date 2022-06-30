// models
const { Module } = require("module");
const { Task } = require("../models/task.model");

//utils
const { catchAsync } = require("../utils/catchAsync.utils");
const { GlobalError } = require("../utils/GlobalError");

const taskExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOne({ where: { id, status: "active" } });
  if (!task) {
    return next(
      new GlobalError("No exist task, or his state no is active", 404)
    );
  }

  req.task = task;
  next();
});

module.exports = { taskExist };
