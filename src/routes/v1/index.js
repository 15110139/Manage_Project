const router = require("express").Router();

// Import files routers
import Auth from "./auth";
import Project from "./project";

//admin

// Create use routers
router.use("/auth", Auth);
router.use("/project", Project);

export default router;
