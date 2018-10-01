import http from "http";

import InitMongo from "./inits/initMongo";
import InitExpress from "./inits/initExpress";
const socketIo = require("socket.io");
const NODE_ENV = process.env.NODE_ENV;

const runApp = async () => {
  try {
    let server = null;
    await InitMongo();
    const app = InitExpress();
    server = http.createServer(app);
    const { PORT } = config.server;
    const io = socketIo(server);
    io.on("connection", socket => {
      console.log("New client connected");
      console.log(socket.id);
      socket.on("movetable", () => {});
      socket.on("disconnect", () => console.log("Client disconnected"));
    });

    server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runApp();
