import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

import ValidationHelp from "../helpers/validation";
import AuthencationHelp from "../helpers/authencation";

import ResponseHelper from "../helpers/response";
// routers
import router from "../routes";
const path = require("path");
const Validation = new ValidationHelp();
export default () => {
  const app = express();
  app.disable("x-powered-by");
  // logger
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

  app.use(bodyParser.json());

  app.use(cors());
  app.use(
    "/static",
    express.static(path.join(__dirname, "../uploads/avatars"))
  );
  // register passport
  app.use(AuthencationHelp.providePassport().initialize());

  // register validation helper
  app.use(Validation.provideDefaultValidator());

  // register router api
  app.use("/", router);

  app.use((err, req, res, next) => {
    return ResponseHelper.respondWithError(res, 500, err.message);
  });

  return app;
};
