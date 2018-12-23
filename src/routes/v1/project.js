const router = require("express").Router();

//import middleware
import authentication from "../../middlewares/authentication";

//import controller
import ProjectController from "../../controllers/project";
let projectController = new ProjectController();

//Routers method GET
router.post(
  "/createNewProjectByUser",
  authentication,
  projectController.createNewProjectByUser
);
router.put(
  "/addMembersToProject",
  authentication,
  projectController.addMembersToProject
);
router.put(
  "/removeMembersToProject",
  authentication,
  projectController.removeMembersToProject
);
router.get(
  "/getListProjectByUser",
  authentication,
  projectController.getListProjectByUser
);

router.get(
  "/getListAndTaskByProjectId/:projectId",
  authentication,
  projectController.getListAndTaskByProjectId
);
router.get(
  "/getProjectAndListAndTaskByTaskId/:taskId",
  authentication,
  projectController.getProjectAndListAndTaskByTaskId
);

router.delete('/removeProject/:projectId', authentication, projectController.removeProject)

router.put('/updateProject/:projectId', authentication, projectController.updateProject)

router.get('/searchUserInProject', authentication, projectController.searchUserInProject)

export default router;
