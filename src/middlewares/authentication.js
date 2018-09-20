var passport = require("passport");
import ResponseHelper from "../helpers/response";
const authenticate = (req, res, next) => {
  passport.authenticate("jwt-auth", {
    onVerified: async (token, user) => {
      if (user.info.status === "BLOCK")
        return ResponseHelper.respondWithError(
          res,
          401,
          "YOUR_ACCOUNT_IS_BLOCKED"
        );
      req.userId = user._id;
      next();
    },
    onFailure: error => {
      ResponseHelper.respondWithError(res, error.status || 401, error.message);
    }
  })(req, res, next);
};
export default authenticate;
