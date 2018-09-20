const router = require("express").Router();

//import middleware
import authentication from "../../middlewares/authentication";

//import controller
import AuthController from "../../controllers/auth";
let authController = new AuthController();

//Routers method GET
router.get("/me", authentication, authController.me);
router.get("/verifyEmail", authController.verifyEmail);

//Routers method POST
// router.post("/login", googleCaptcha, authController.login);
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post(
  "/reSendVerifyEmail",

  authController.reSendVerifyEmail
);


//Routers method PUT
router.put(
  "/updateInformationByUserId",
  authentication,
  authController.updateInformationByUserId
);
router.put(
  "/updateAvatarByUserId",
  authentication,
  authController.updateAvatarByUserId
);
router.put(
  "/updatePasswordByUserId",
  authentication,
  authController.updatePasswordByUserId
);
//Routers method DELETE

router.post("/resetPassword", authController.resetPassword);

export default router;
