const LocalAuthStrategy = require("passport-local").Strategy;
import NotFoundError from "../../errors/not-found";
import UnauthorizedError from "../../errors/unauthorized";

import UserModel from "../../models/User";

class CredentialsAuthStrategy extends LocalAuthStrategy {
  constructor() {
    super(CredentialsAuthStrategy.provideOptions(), CredentialsAuthStrategy.handleUserAuth);
  }

  get name() {
    return "credentials-auth";
  }

  static handleUserAuth(username, password, done) {
    let email = username.toLowerCase();

    UserModel.findOne({ email }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(new NotFoundError("EMAIL_DOES_NOT_EXIST"), false);
      }
      user
        .comparePassword(password)
        .then(isMatch => {
          if (!isMatch) {
            return done(new UnauthorizedError("INCORRECT_PASSWORD"), false);
          } else return done(null, user);
        })
        .catch(err => {
          return done(new UnauthorizedError(err), false);
        });
    });
  }

  static provideOptions() {
    return {
      usernameField: "email",
      passReqToCallback: false,
      passwordField: "password",
      session: false
    };
  }

  getSecretKey() {
    throw new Error("No key is required for this type of auth");
  }
}
export default CredentialsAuthStrategy;
