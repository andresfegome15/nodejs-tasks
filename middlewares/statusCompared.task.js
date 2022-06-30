//utils

const { catchAsync } = require("../utils/catchAsync.utils");
const { GlobalError } = require("../utils/GlobalError");

const comparedStatus = catchAsync(async (req, res, next) => {
  const { status } = req.params;
  const statates = ["activo", "late", "completed", "cancelled"];
  let compared = false;
  for (let i = 0; i <= statates.length; i++) {
    if (statates[i] === status) {
      compared = true;
    } else {
      return next(new GlobalError("status no found", 404));
    }
  }
  req.compared = compared;
  req.status = status;
  next();
});

module.exports = { comparedStatus };
