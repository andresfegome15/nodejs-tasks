const { db, DataTypes } = require("../utils/db.utils");

const Task = db.define("task", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  limitDate: { type: DataTypes.DATE, allowNull: false },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Date.now(),
  },
  finishDate: { type: DataTypes.DATE, defaultValue: Date.now() },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: "active" },
});

module.exports = { Task };
