import "dotenv/config";

export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: "127.0.0.1",
    port: process.env.DB_PORT,
    dialect: !process.env.DB_DIALECT || "postgres",
    logging: true,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_TEST,
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false,
  },
};
