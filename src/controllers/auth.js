import BaseController from "./base";
import AuthHandler from "../handlers/auth";
import EmailHandler from "../handlers/email";

let authHandler = new AuthHandler();
let emailHandler = new EmailHandler();
import emailConfig from "../../config/email";
import contentEmail from "../../config/contentVerifyEmail";

import moment from "moment";
import sha256 from "sha256";

//Import validate input scheme
import {
  UPDATE_AVATAR_VALIDATE_SCHEMA,
  CHANGE_PASSWORD_SCHEMA,
  VERIFY_EMAIL_SCHEMA,
  EMAIL_VALIDATE_SCHEMA,
  RESET_PASSWORD_SCHEMA
} from "../validationSchemes/auth";
import ValidationError from "../errors/validation";
import UserModel from "../models/User";

class AuthController extends BaseController {
  constructor() {
    super();
    this._passport = require("passport");
  }
  login(req, res, next) {
    this.authenticateLogin(req, res, next, user => {
      authHandler.login(
        req,
        user,
        this._responseHelper.getDefaultResponseHandler(res)
      );
    });
  }
  register(req, res) {
    return authHandler.register(
      req,
      this._responseHelper.getDefaultResponseHandler(res)
    );
  }

  authenticate(req, res, next, callback) {
    let responseManager = this._responseHelper;
    this._passport.authenticate("jwt-auth", {
      onVerified: callback,
      onFailure: function(error) {
        responseManager.respondWithError(
          res,
          error.status || 401,
          error.message
        );
      }
    })(req, res, next);
  }

  authenticateLogin(req, res, next, callback) {
    let responseManager = this._responseHelper;
    this._passport.authenticate("credentials-auth", function(err, user) {
      if (err) {
        responseManager.respondWithError(
          res,
          err.status || 401,
          err.message || ""
        );
      } else {
        callback(user);
      }
    })(req, res, next);
  }

  /**
   * Function : Update information of user
   * Params: fields update
   * Result: new information or error code
   */
  async updateInformationByUserId(req, res, next) {
    let data = req.body;
    try {
      let updated;
      let isAllFieldsUpdate = await authHandler.checkFieldsCanUpdate(data);
      if (isAllFieldsUpdate)
        updated = await authHandler.updateInformationByUserId(req.userId, data);
      this.response(res).onSuccess(updated);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }
  async findUserByEmail(email) {
    const user = await UserModel.findOne({ email });
    return user;
  }
  async findUserBySoponr(sponsorCode) {
    const listuser = await UserModel.find({ sponsorCode }).select({
      _id: 1,
      username: 1
    });
    return listuser;
  }

  async updateAvatarByUserId(req, res, next) {
    let data = req.body;
    try {
      //validate input
      let errors = await this.getErrorsParameters(
        req,
        UPDATE_AVATAR_VALIDATE_SCHEMA
      );
      if (errors.length > 0) throw new ValidationError(errors);

      let updated = await authHandler.updateAvatarByUserId(
        req.userId,
        data.avatarUrl
      );
      this.response(res).onSuccess(updated);
    } catch (errors) {
      this.response(res).onError(errors);
    }
  }

  async updatePasswordByUserId(req, res, next) {
    let data = req.body;
    try {
      const errors = await this.getErrorsParameters(
        req,
        CHANGE_PASSWORD_SCHEMA
      );
      if (errors.length > 0) throw new ValidationError(errors);
      let update = await authHandler.updatePasswordByUserId(
        req.userId,
        data.oldPassword,
        data.newPassword
      );

      return this.response(res).onSuccess("SUCCESS");
    } catch (errors) {
      return this.response(res).onError(errors);
    }
  }

  async verifyEmail(req, res, next) {
    let { email, codeVerify } = req.query;
    try {
      const errors = await this.getErrorsParameters(
        req,
        null,
        VERIFY_EMAIL_SCHEMA
      );
      if (errors.length > 0) throw new ValidationError(errors);

      //Check valid email
      let user = await authHandler.getInformationByEmail(email);
      if (!user) throw new ValidationError("NOT_FOUND_EMAIL");

      //Check code verify
      if (user.codeVerify != codeVerify)
        throw new ValidationError("CODE_VERIFY_NOT_MATCH");

      //Check email is varified
      if (user.isEmailVerified === true) {
        throw new ValidationError("EMAIL_IS_VERIFIED");
      }

      //Update verify
      await authHandler.updateInformationByUserId(user._id, {
        isEmailVerified: true
      });

      //+ 20CSE for user
      let userid = user._id;
      await authHandler.coupon20CSE(userid);

      // + 20CSE for sponsor
      let sponsorCode = await UserModel.findById(userid).select("sponsorCode");
      let sponsor = await UserModel.findById(sponsorCode.sponsorCode);
      if (sponsor && sponsor.isEmailVerified === true)
        await authHandler.coupon20CSE(sponsor._id);

      return this.response(res).onSuccess("SUCCESS");
    } catch (error) {
      return this.response(res).onError(error);
    }
  }

  async reSendVerifyEmail(req, res, next) {
    let { email } = req.body;
    try {
      const errors = await this.getErrorsParameters(req, EMAIL_VALIDATE_SCHEMA);
      if (errors.length > 0) throw new ValidationError(errors);

      let code = sha256(moment().toISOString());
      //Check valid email
      let user = await authHandler.getInformationByEmail(email);
      if (!user) throw new ValidationError("NOT_FOUND_EMAIL");

      //Update code verify
      await authHandler.updateInformationByUserId(user._id, {
        codeVerify: code
      });
      // send email verify
      const payload = {
        to: email,
        from: '"CSE Token" <support@csetoken.io>',
        subject: "CSE Email Verification - no reply",
        html: contentEmail(
          `https://dashboard.` +
            emailConfig.domain +
            `/verifyemail?email=` +
            email +
            `&codeVerify=` +
            code
        )
        // "<a href='http://"+emailConfig.domain+"/?email=" +
        // email +
        // "&codeVerify=" +
        // code +
        // "'>Click me</a> to verify your email."
      };
      await emailHandler.sendEmail(payload);
      return this.response(res).onSuccess("SUCCESS");
    } catch (error) {
      return this.response(res).onError(error);
    }
  }
  /**
   * Function : Get all information of user
   * Params: token
   * Result: information of user
   */
  async me(req, res, next) {
    try {
      let user = await authHandler.getInformationByUserId(req.userId);
      return this.response(res).onSuccess({ user });
    } catch (errors) {
      console.log(errors);
      return this.response(res).onError(errors);
    }
  }

  async remove2Fa(req, res, next) {
    try {
      let isAvailable = await authHandler.isHave2Fa(req.userId);
      if (!isAvailable) throw new ValidationError("2FA_NOT_EXISTS");
      let remove = await authHandler.removeUser2Fa(req.userId);
      return this.response(res).onSuccess("SUCCESS");
    } catch (error) {
      return this.response(res).onError(error);
    }
  }

  async resetPassword(req, res, next) {
    console.log("resetPassword");
    try {
      const { email } = req.body;
      const errors = await this.getErrorsParameters(
        req,
        RESET_PASSWORD_SCHEMA,
        null
      );
      if (errors.length > 0) throw new ValidationError(errors);
      const user = await authHandler.getInformationByEmail(email);
      if (!user) throw new ValidationError("EMAIL_IS_NOT_REGISTER");
      const newpass = await authHandler.randomPassword(6);
      const payload = {
        to: email,
        from: '"CSE Token" <support@csetoken.io>',
        subject: "CSE Email Reset Password - no reply",
        html: contentEmail(
          `New Password is <h3>${newpass}</h3>.Please change password `
        )
      };
      await authHandler.updatePassworByEmail(email, newpass);
      await emailHandler.sendEmail(payload);
      /*   console.log(updateCodeVerify); */
      return this.response(res).onSuccess("SUCCESS");
    } catch (error) {
      console.log(error);
      return this.response(res).onError(error);
    }
  }
}

export default AuthController;
