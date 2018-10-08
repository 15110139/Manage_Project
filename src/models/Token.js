import mongoose from "mongoose";
require("mongoose-uuid2")(mongoose);
const uuid = require("node-uuid");

const TokenSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid.v4 },
    token: {
      type: String
    },
    userId: {
      type: String
    },
    refreshToken: {
      type: String
    }
  },
  { timestamps: true }
);

const TokenModel = mongoose.model("Token", TokenSchema);
export default TokenModel;
