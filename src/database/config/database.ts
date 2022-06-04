import sequelize from "sequelize";

const DB: sequelize.Sequelize = new sequelize.Sequelize(
  process.env.DB_DATABASE as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    dialect: "mysql",
    host: process.env.DB_HOST as string,
    port: Number(process.env.SERVER_PORT),
  }
);

export default DB;
