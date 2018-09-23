const router = require("express").Router();

// Import files routers
import Auth from "./auth";
import Project from "./project";
import ListTask from "./listtask";
import Task from "./task";

//admin

// Create use routers
router.use("/auth", Auth);
router.use("/project", Project);
router.use("/listtask", ListTask);
router.use("/task", Task);

export default router;
