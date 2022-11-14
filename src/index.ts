import "dotenv/config";
import App from "./app";
import prismaClient from "./database/prismaClient";

new App().server.listen(
  Number(process.env.SERVER_PORT!),
  String(process.env.SERVER_HOST!),
  async () => {
    let retries: number = 5;

    while (retries) {
      try {
        await prismaClient.$connect();

        console.log("DB Connected!!");

        console.log("Server running");

        break;
      } catch (error: any) {
        console.log(error);

        retries -= 1;

        console.log(`retries left ${retries}!`);

        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }
);
