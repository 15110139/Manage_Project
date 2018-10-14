const router = require("express").Router();

//import middleware
import authentication from "../../middlewares/authentication";

//import controller
import ListController from "../../controllers/list";
let listController = new ListController();

//Routers method GET
router.post("/createNewList", authentication, listController.createNewList);
router.put("/updateList", authentication, listController.updateList);
router.delete("/removeList", authentication, listController.removeList);
router.get(
  "/getListByProjectId/:projectId",
  authentication,
  listController.getListsByProjectId
);


export default router;
