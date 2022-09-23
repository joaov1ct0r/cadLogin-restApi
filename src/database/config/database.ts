import sequelize, { Dialect } from "sequelize";

const DB: sequelize.Sequelize = new sequelize.Sequelize({
  dialect: (process.env.DB_DIALECT as Dialect) || ("postgres" as Dialect),
  host: "127.0.0.1" as string,
  database:
    process.env.NODE_ENV === "test"
      ? (process.env.DB_DATABASE_TEST as string)
      : (process.env.DB_DATABASE as string),
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  logging: false,
});

export default DB;
