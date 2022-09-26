import sequelize from "sequelize";

const DB: sequelize.Sequelize = new sequelize.Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  database:
    process.env.NODE_ENV === "test"
      ? (process.env.DB_DATABASE_TEST as string)
      : (process.env.DB_DATABASE as string),
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  logging: false,
});

export default DB;
