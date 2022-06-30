const { Sequelize, DataTypes } = require("sequelize");

const db = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  port: 5432,
  password: "acuario1",
  database: "entregables2",

  logging: false,
});

module.exports = { db, DataTypes };
