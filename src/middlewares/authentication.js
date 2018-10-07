import ResponseHelper from "../helpers/response";
const jwt = require("jsonwebtoken");
const config = require("./config");

const authenticate = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["access-token"];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        ResponseHelper.respondWithError(
          res,
          error.status || 401,
          error.message || "Unauthorized access"
        );
      }
      req.userId = decoded.userId;
      req.fullName = decoded.fullName;
      next();
    });
  } else {
    ResponseHelper.respondWithError(res, 403, "No token provided");
  }
};
export default authenticate;
