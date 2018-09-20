import http from "http";

import InitMongo from "./inits/initMongo";
import InitExpress from "./inits/initExpress";

const NODE_ENV = process.env.NODE_ENV;

const runApp = async () => {
  try {
    let server = null;
    await InitMongo();
    const app = InitExpress();
    server = http.createServer(app);
    const { PORT } = config.server;
    server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runApp();
