const express = require("express");

//utils
const { GlobalError } = require("./utils/GlobalError");

//controller
const { globalErrorHandler } = require("./controller/error.controller");
const app = express();
app.use(express.json());

//routes
const { userRoutes } = require("./routes/users.routes.js");
const { tasksRoutes } = require("./routes/tasks.routes");

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", tasksRoutes);

app.all("*", (req, res, next) => {
  next(
    new GlobalError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = { app };
