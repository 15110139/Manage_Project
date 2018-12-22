import mongoose from "mongoose";
import bcrypt from "bcrypt";
import mongoosePaginate from "mongoose-paginate";
const SALT_WORK_FACTOR = 10;
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      default: ""
    },
    lastName: {
      type: String,
      default: ""
    },
    avatarUrl: {
      type: String,
      default: ""
    },
    fullName: {
      type: String
    },
    lastAccess: {
      type: Date
    }
  },
  { timestamps: true }
);
UserSchema.pre("save", function (cb) {
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


UserSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((res, rej) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return rej(err);
      return res(isMatch);
    });
  });
};
UserSchema.plugin(mongoosePaginate);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
