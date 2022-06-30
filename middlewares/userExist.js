//models
const { User } = require("../models/user.model");

//utils
const { catchAsync } = require("../utils/catchAsync.utils");
const { GlobalError } = require("../utils/GlobalError");

const userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return next(new GlobalError("user no exist", 404));
  }

  req.user = user;
  next();
});

module.exports = { userExist };
