import Base from "./base";
//Import models
import TokenModel from "../models/Token";

class TokenHandler extends Base {
  async createNewToken(token, refreshToken, userId) {
    const newToken = await TokenModel.create({
      token,
      refreshToken,
      userId
    });
    return newToken;
  }
  async updateToken(token, refreshToken) {
    await TokenModel.updateOne({ refreshToken }, { token });
  }
  async getTokenByToken(token) {
    const TokenByToken = await TokenModel.findOne({ token });
    return TokenByToken;
  }

  async getTokenByRefreshToken(refreshToken) {
    const TokenByRefreshToken = await TokenModel.findOne({ refreshToken });
    return TokenByRefreshToken;
  }
  async getTokenByUser(userId) {
    const TokenByUser = await TokenModel.findOne({ userId });
    return TokenByUser;
  }
  async deleteToken(refreshToken) {
    await TokenModel.deleteOne({ refreshToken });
  }
}
export default TokenHandler;
