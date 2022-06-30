const { body, validationResult } = require("express-validator");

const { GlobalError } = require("../utils/GlobalError");

const checkResult = (req, res, next) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    const Messerror = errores.array().map(err => err.msg);

    const message = Messerror.join(". ");

    return next(new GlobalError(message, 400));
  }

  next();
};

const validator = [
  body("name").notEmpty().withMessage("the camp name cannot null"),
  body("email").isEmail().withMessage("email don't have format"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password characters min 8")
    .isAlphanumeric()
    .withMessage("Password is alphanumeric"),
  checkResult,
];
const validatorUserUpdate = [
  body("name").notEmpty().withMessage("the camp name cannot null"),
  body("email").isEmail().withMessage("email don't have format"),
  checkResult,
];

module.exports = { validator, validatorUserUpdate };
