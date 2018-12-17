import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
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
