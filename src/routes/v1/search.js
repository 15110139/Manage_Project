import authentication from "../../middlewares/authentication";

import SearchController from "../../controllers/search";
const router = require("express").Router();

let searchController = new SearchController();

router.get("/searchUser", authentication, searchController.searchUser);

export default router;
