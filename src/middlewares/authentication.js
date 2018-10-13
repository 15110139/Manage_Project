import ResponseHelper from "../helpers/response";
const jwt = require("jsonwebtoken");
const config = require("./config");
import TokenHandler from "../handlers/token";

const tokenHandler = new TokenHandler();
const authenticate = function(req, res, next) {
  const token =
    req.body.token || req.query.token || req.headers["access-token"];
  if (!token)
    throw ResponseHelper.respondWithError(res, null, "NO_TOKEN_PROVIDED");
  try {
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err && err.message === "invalid token") throw "INVALID_TOKEN";
      if (err && err.message === "jwt expired") {
        const refresherToken = await tokenHandler.getTokenByToken(token);
        if (!refresherToken)
          return ResponseHelper.respondWithError(res, "INVALID_TOKEN", null);
        jwt.verify(
          refresherToken.refreshToken,
          config.refreshTokenSecret,
          async (err, decoded) => {
            if (err) {
              await tokenHandler.deleteToken(refresherToken.refreshToken);
              return ResponseHelper.respondWithError(
                res,
                "INVALID_TOKEN",
                null
              );
            }
            const token = jwt.sign(
              { userId: refresherToken.userId },
              config.secret,
              {
                expiresIn: config.tokenLife
              }
            );
            await tokenHandler.updateToken(token, refresherToken.refreshToken);
            return ResponseHelper.respondWithSuccess(
              res,
              { token },
              "NEW_TOKEN"
            );
          }
        );
      }
      req.userId = decoded.userId;
      return next();
    });
  } catch (error) {
    ResponseHelper.respondWithError(res, error, null);
  }
};
export default authenticate;
