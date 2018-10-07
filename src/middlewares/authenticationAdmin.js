var passport = require("passport");
import ResponseHelper from "../helpers/response";
import AuthHandler from "../handlers/auth";
var authHandler = new AuthHandler();
const authenticate = (req, res, next) => {
    passport.authenticate("jwt-auth", {
        onVerified: async (token, user) => {
            req.userId = user._id;
            let isAdmin = await authHandler.isAdmin(user._id);
            if (!isAdmin)
                return ResponseHelper.respondWithError(
                    res,
                    500,
                    'NOT_PERMISSION'
                );

            next();
        },
        onFailure: (error) => {
            ResponseHelper.respondWithError(
                res,
                error.status || 401,
                error.message
            );
        }
    })(req, res, next);
}
export default authenticate;