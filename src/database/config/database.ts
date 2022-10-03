import sequelize, { Dialect } from "sequelize";

const DB: sequelize.Sequelize = new sequelize.Sequelize(
  process.env.NODE_ENV! === "test"
    ? process.env.DB_DATABASE_TEST!
    : process.env.DB_DATABASE!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    dialect: "postgres" as Dialect,
    logging: true,
  }
);

export default DB;
