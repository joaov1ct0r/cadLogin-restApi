import sequelize from "sequelize";

const DB: sequelize.Sequelize = new sequelize.Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST as string,
  database: process.env.DB_DATABASE as string,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
});

export default DB;
