import "dotenv/config";

import App from "./app";

import DB from "./database/config/database";

new App().server.listen(process.env.SERVER_PORT, async () => {
  console.log("Server running");

  try {
    await DB.authenticate();

    console.log("DB Connected!!");
  } catch (error: any) {
    throw new Error(error);
  }
});
