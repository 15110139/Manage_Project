const router = require("express").Router();

//import middleware
import authentication from "../../middlewares/authentication";

//import controller
import ProjectController from "../../controllers/project";
let projectController = new ProjectController();

//Routers method GET
router.post("/createNewProjectByUser", authentication, projectController.createNewProjectByUser);



export default router;
