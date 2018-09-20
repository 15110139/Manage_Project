import fs from "fs"
import path from "path"
import { ActivityTypes } from '../commons/Types';
const ExtractJwt = require("passport-jwt").ExtractJwt

import BaseAutoBind from "../base/BaseAutoBind"

// import strategies
import JwtRsStrategy from "./strategies/jwt"
import CredentialsAuth from "./strategies/credentials"

// import errors
import ForbiddenError from "../errors/forbidden"

// import models
import RevokedToken from "../models/RevokedToken"
import User from "../models/User"

class Authencation extends BaseAutoBind {
  constructor() {
    super()
    this._passport = require("passport")
    this._strategies = []
    this._jwtTokenHandler = require("jsonwebtoken")
    this._setupStrategies()
    this._setPassportStrategies()
  }

  _setupStrategies() {
    // Init JWT strategy
    let jwtOptions = this._provideJwtOptions()
    let jwtRs = new JwtRsStrategy(jwtOptions, this._verifyRevokedToken)
    this._strategies.push(jwtRs)
    this._strategies.push(new CredentialsAuth())
  }

  _verifyRevokedToken(token, payload, callback) {
    const userId = payload._id
    User.findOne({ _id: userId, status: ActivityTypes.ACTIVE }, (err, user) => {
      if (err) return callback.onFailure(new ForbiddenError("ERROR LOAD USER"))
      if (!user) return callback.onFailure(new ForbiddenError("NOT_FOUND_USER"))
      RevokedToken.find({ token: token }, function(err, docs) {
        if (docs.length) {
          callback.onFailure(new ForbiddenError("Token has been revoked"))
        } else {
          payload.info = user;
          callback.onVerified(token, payload)
        }
      })
    })
  }

  extractJwtToken(req) {
    return ExtractJwt.fromAuthHeader()(req)
  }

  _provideJwtOptions() {
    let config = global.config
    let jwtOptions = {}
    jwtOptions.extractJwtToken = ExtractJwt.fromHeader("access-token")
    jwtOptions.privateKey = this._provideJwtPrivateKey()
    jwtOptions.publicKey = this._provideJwtPublicKey()
    jwtOptions.issuer = config.jwtOptions.issuer
    jwtOptions.audience = config.jwtOptions.audience
    return jwtOptions
  }

  _provideJwtPublicKey() {
    return fs.readFileSync(
      path.join(__dirname, "../../config/secret/jwt-key.pub"),
      "utf8"
    )
  }

  _provideJwtPrivateKey() {
    return fs.readFileSync(
      path.join(__dirname, "../../config/secret/jwt-key.pem"),
      "utf8"
    )
  }

  providePassport() {
    return this._passport
  }

  _setPassportStrategies() {
    let passport = this._passport
    this._strategies.forEach(function(strategy) {
      passport.use(strategy)
    })
  }

  getSecretKeyForStrategy(name) {
    for (let i = 0; i < this._strategies.length; i++) {
      let strategy = this._strategies[i]
      if (strategy && strategy.name === name) {
        return strategy.provideSecretKey()
      }
    }
  }

  signToken(strategyName, payload, options) {
    let key = this.getSecretKeyForStrategy(strategyName)
    switch (strategyName) {
      case "jwt-auth":
        return this._jwtTokenHandler.sign(payload, key, options)
      default:
        throw new TypeError(
          "Cannot sign toke for the " + strategyName + " strategy"
        )
    }
  }
}

export default new Authencation()
