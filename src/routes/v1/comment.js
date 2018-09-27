const router = require("express").Router();

//import middleware
import authentication from "../../middlewares/authentication";

//import controller
import CommentController from "../../controllers/comment";
let commentController = new CommentController();

//Routers method GET
router.post(
  "/createNewComment",
  authentication,
  commentController.createNewComment
);

export default router;
