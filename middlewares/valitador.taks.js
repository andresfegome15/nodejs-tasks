const { body, validationResult } = require("express-validator");

const { GlobalError } = require("../utils/GlobalError");

const checkeResultadosTask = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    const MessError = errores.array().map(err => err.msg);
    const message = MessError.join(". ");
    return next(new GlobalError(message, 400));
  }
  next();
};

const validatorTask = [
  body("title").notEmpty().withMessage("the campo title cannot by null"),
  body("userId")
    .isNumeric()
    .withMessage("camp userId cannot by diferent of numeric"),
  body("limitDate")
    .isDate()
    .withMessage("camp limitDate cannot by diferent of Date"),
  checkeResultadosTask,
];

module.exports = { validatorTask };
