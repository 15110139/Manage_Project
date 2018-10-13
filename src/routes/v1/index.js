const router = require("express").Router();

// Import files routers
import Auth from "./auth";
import Project from "./project";
import List from "./list";
import Task from "./task";
import Search from './search'

//admin

// Create use routers
router.use("/auth", Auth);
router.use("/project", Project);
router.use("/list", List);
router.use("/task", Task);
router.use("/search",Search)

export default router;
