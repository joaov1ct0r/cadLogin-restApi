import "dotenv/config";

import App from "./app";

new App().server.listen(process.env.SERVER_PORT, () => {
  console.log("Server running");
});
