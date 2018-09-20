import ValidationError from "../errors/validation";
import validator from "validator";
import requestIp from "request-ip";
import emailConfig from "../../config/email";
import contentEmail from "../../config/contentVerifyEmail";
import Base from "./base";
const uuidv4 = require("uuid/v4");
//Import models
import UserModel from "../models/User";
import {
  LOGIN_VALIDATION_SCHEMA,
} from "../validationSchemes/auth";

import AuthHelp from "../helpers/authencation";
import EmailHandler from "./email";

// import RevenueModel from "../models/Revenue";

const emailHandler = new EmailHandler();

class AuthHandler extends Base {
  async login(req, user, callback) {
    const data = req.body;
    try {
      let errors = await this.getErrorsParameters(req, LOGIN_VALIDATION_SCHEMA);
      if (errors.length > 0) throw new ValidationError(errors);
      // if (!user.isEmailVerified)
      //   throw new ValidationError("EMAIL_NOT_VERIFIED");

      if (user.status === "BLOCK")
        throw new ValidationError("YOUR_ACCOUNT_IS_BLOCKED");
      let token = await this.getToken(user);
      if (!token) throw new ValidationError("EMAIL_OR_PASSWORD_NOTFOUND");

      //update lastLoginIP

      return callback.onSuccess({ token });
    } catch (errors) {
      console.log(errors);
      return callback.onError(errors);
    }
  }

  getToken(user) {
    return AuthHelp.signToken(
      "jwt-auth",
      this._provideTokenPayload(user),
      this._provideTokenOptions()
    );
  }

  getSponsorId(username) {
    return new Promise((resolve, reject) => {
      if (!username) return reject(new ValidationError("NOT_FOUND_SPONSOR"));
      return UserModel.findOne({ username, status: { $ne: "BLOCK" } }).then(
        result => {
          if (!result) reject(new ValidationError("NOT_FOUND_SPONSOR"));
          else resolve(result._id);
        }
      );
    });
  }

  async register(req, callback) {
    const data = req.body;
    try {
      //Validate input
      /*   let errors = await this.getErrorsParameters(
        req,
        REGISTER_VALIDATION_SCHEMA
      );
      if (errors.length > 0) throw new ValidationError(errors); */

      //Handling
      // let username = changeToSlug(data.username);
      let email = data.email.toLowerCase();
      console.log(uuidv4());
      let isExistEmail = await UserModel.findOne({ email });
      if (isExistEmail) {
        throw new ValidationError("EMAIL_IS_EXIST");
      }
      // let isExistUsername = await UserModel.findOne({ username });
      let created = await UserModel.create({
        email,
        password: validator.trim(data.password),
        projects: []
      });

      // send email verify
      const payload = {
        to: created.email,
        from: '"CSE Token" <support@csetoken.io>',
        subject: "CSE Email Verification - no reply",
        html: contentEmail(
          `https://dashboard.` +
            emailConfig.domain +
            `/verifyEmail?email=` +
            created.email +
            `&codeVerify=` +
            created.codeVerify
        )
        // "<a href='http://" +
        // emailConfig.domain +
        // "/?email=" +
        // created.email +
        // "&codeVerify=" +
        // created.codeVerify +
        // "'>Click me</a> to verify your email."
      };

      // await emailHandler.sendEmail(payload);
      let token = await this.getToken(created);
      if (!token) throw new ValidationError("EMAIL_OR_PASSWORD_NOTFOUND");
      return callback.onSuccess({ token });
    } catch (errors) {
      console.log(errors);
      return callback.onError(errors);
    }
  }

  _provideTokenPayload(user) {
    return {
      _id: user._id,
      username: user.username
    };
  }

  _provideTokenOptions() {
    let config = global.config;
    return {
      expiresIn: "2 days",
      audience: config.jwtOptions.audience,
      issuer: config.jwtOptions.issuer,
      algorithm: config.jwtOptions.algorithm
    };
  }

  async checkFieldsCanUpdate(fields = {}) {
    let canUpdates = {
      fullName: 1,
      phoneNumber: 1,
      address: 1,
      birthDay: 1
    };
    //Check field can update
    Object.keys(fields).map(key => {
      if (!canUpdates[key])
        throw new ValidationError(key.toLocaleUpperCase() + "_CANT_UPDATE");
    });
    return true;
  }
  async updateInformationByUserId(userId, data = {}) {
    let updating = await UserModel.update(
      { _id: userId },
      {
        ...data
      }
    );
    let updated = await UserModel.findById(userId).select({
      fullName: 1,
      phoneNumber: 1,
      address: 1,
      birthDay: 1
    });
    return updated;
  }

  async updateAvatarByUserId(userId, avatarUrl) {
    let update = await UserModel.update(
      { _id: userId },
      {
        avatarUrl: avatarUrl
      }
    );
    let url = await UserModel.findById(userId).select({ avatarUrl: 1 });
    return url;
  }

  async getInformationByUserId(userId) {
    let user = await UserModel.findById(userId);
    if (user) {
      user = user.toObject();
      delete user.password;
    }
    return user;
  }

  async getInformationByEmail(email) {
    let user = await UserModel.findOne({ email });
    if (user) {
      user = user.toObject();
      delete user.password;
    }
    return user;
  }

  async updatePasswordByUserId(userId, oldPassword, newPassword) {
    let user = await UserModel.findById(userId);
    if (!user) throw new ValidationError("NOT_FOUND_USER");
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) throw new ValidationError("INCORRECT_PASSWORD");
    user.password = newPassword;
    return user.save();
  }

  async isValidUser(userId) {
    let user = await UserModel.findOne({ _id: userId });
    if (!user) return false;
    return true;
  }

  async isAdmin(userId) {
    let user = await UserModel.findOne({
      _id: userId,
      $or: [{ isAdmin: true }, { isManager: true }]
    });
    if (!user) return false;
    return true;
  }

  async countUsers() {
    let users = await UserModel.find({});
    return users.length;
  }

  async randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
      var i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
    }
    return pass;
  }
  async updatePassworByEmail(email, password) {
    const user = await UserModel.findOne({ email });
    console.log("user", user.password);
    user.password = password;
    console.log("user", user.password);
    return user.save();
  }

  //
}
export default AuthHandler;
