const express = require("express");

//init route
const userRoutes = express.Router();

//validator
const { validator, validatorUserUpdate } = require("../middlewares/validator");

//middlewares
const { userExist } = require("../middlewares/userExist");

//controller
const {
  getuser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");

userRoutes.get("/", getuser);
userRoutes.post("/", validator, createUser);
userRoutes.patch("/:id", validatorUserUpdate, userExist, updateUser);
userRoutes.delete("/:id", userExist, deleteUser);

module.exports = { userRoutes };
