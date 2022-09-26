import sequelize from "sequelize";

const DB: sequelize.Sequelize = new sequelize.Sequelize({
  dialect: "postgres",
  host:
    process.env.NODE_ENV === "production"
      ? process.env.DB_HOST
      : process.env.DB_HOST_DEV,
  database:
    process.env.NODE_ENV === "test"
      ? (process.env.DB_DATABASE_TEST as string)
      : (process.env.DB_DATABASE as string),
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  logging: false,
});

export default DB;
