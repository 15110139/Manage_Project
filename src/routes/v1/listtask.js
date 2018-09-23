const router = require("express").Router();

//import middleware
import authentication from "../../middlewares/authentication";

//import controller
import ListTaskController from "../../controllers/listtask";
let listTaskController = new ListTaskController();

//Routers method GET
router.post(
  "/createNewListTask",
  authentication,
  listTaskController.createNewListTask
);
router.delete(
  "/removeListTask",
  authentication,
  listTaskController.removeListTask
);

export default router;
