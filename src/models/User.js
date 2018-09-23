import mongoose from "mongoose";
import bcrypt from "bcrypt";
const SALT_WORK_FACTOR = 10;
require("mongoose-uuid2")(mongoose);
const uuid = require("node-uuid");
const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid.v4 },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      default: ""
    },
    avatarUrl: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", function(cb) {
  const user = this;
  if (!user.isModified("password")) return cb();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return cb(err);

    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) return cb(hashErr);
      user.password = hash;
      // user.codeVerify = sha256(moment().toISOString());
      cb();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((res, rej) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return rej(err);
      return res(isMatch);
    });
  });
};
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
