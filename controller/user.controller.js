const bcrypt = require("bcryptjs");

const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");
const { catchAsync } = require("../utils/catchAsync.utils");

const getuser = catchAsync(async (req, res, next) => {
  const user = await User.findAll({
    attributes: ["id", "name", "status"],
    include: [{ model: Task, attributes: ["id", "title", "status"] }],
    where: { status: "active" },
  });

  res.status(200).json({ user });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashPassword });

  user.password = undefined;
  res.status(201).json({
    status: "done",
    user,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;
  await user.update({ name, email });
  user.password = undefined;
  res.status(204).json({
    status: "done",
    user,
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  await user.update({ status: "inactive" });
  res.status(204).json({ status: "user delete" });
});

module.exports = { getuser, createUser, updateUser, deleteUser };
