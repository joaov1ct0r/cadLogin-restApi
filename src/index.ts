import "dotenv/config";

import App from "./app";

import DB from "./database/config/database";

new App().server.listen(process.env.SERVER_PORT, async () => {
  console.log("Server running");

  let retries: number = 5;

  while (retries) {
    try {
      await DB.authenticate();

      console.log("DB Connected!!");

      break;
    } catch (error: any) {
      console.log(error);

      retries -= 1;

      console.log(`retries left ${retries}!`);

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
});
