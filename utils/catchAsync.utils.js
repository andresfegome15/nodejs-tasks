const catchAsync = af => {
  return (req, res, next) => {
    af(req, res, next).catch(err => next(err));
  };
};

module.exports = { catchAsync };
