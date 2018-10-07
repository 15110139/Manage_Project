import ValidationError from "../errors/validation";
import Base from "./base";
var bcrypt = require("bcrypt");
import UserModel from "../models/User";
import validator from "validator";

class AuthHandler extends Base {
  async loginAccount(emailOrUserName, password) {
    const isEmail = validator.isEmail(emailOrUserName); //=> true
    let user = {};
    if (isEmail) {
      user = await UserModel.findOne({ email: emailOrUserName });
      if (!user) throw new ValidationError("EMAIL_IS_NOT_EXIST");
    } else {
      user = await UserModel.findOne({ username: emailOrUserName });
      if (!user) throw new ValidationError("USER_NAME_IS_NOT_EXIST");
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return user;
    } else return false;
  }
  async createNewUser(email, password, username, firstName, lastName) {
    const newUser = await UserModel.create({
      email,
      password,
      username,
      firstName,
      lastName
    });
    return newUser;
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

  async getUserById(userId) {
    let user = await UserModel.findOne({ _id: userId });
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
    user.password = password;
    return user.save();
  }

  //
}
export default AuthHandler;
