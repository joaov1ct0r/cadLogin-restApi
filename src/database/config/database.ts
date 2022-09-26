import sequelize, { Dialect } from "sequelize";

const DB: sequelize.Sequelize = new sequelize.Sequelize({
  dialect: "postgres" as Dialect,
  host:
    process.env.NODE_ENV === "production"
      ? (process.env.DB_HOST as string)
      : (process.env.DB_HOST_DEV as string),
  database:
    process.env.NODE_ENV === "test"
      ? (process.env.DB_DATABASE_TEST as string)
      : (process.env.DB_DATABASE as string),
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  logging: true,
});

export default DB;
