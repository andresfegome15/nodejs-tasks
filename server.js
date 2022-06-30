const { app } = require("./app");

//models
const { User } = require("./models/user.model");
const { Task } = require("./models/task.model");

//utils
const { db } = require("./utils/db.utils");

db.authenticate()
  .then(() => console.log("hecho"))
  .catch(err => console.log(err));

//modelo de relaciones
//1user <---> M tasks
User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User);

db.sync()
  .then(() => console.log("sync hecho"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("tasks running");
});
