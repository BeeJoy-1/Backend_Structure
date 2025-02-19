const express = require("express");
const { Router } = express;
const _ = Router();
const { ApiResponse } = require("../../Utils/ApiResponse.js");
const {
  CreateUser,
  LoginController,
  OTPmatchController,
  ForgotPassController,
} = require("../../Controller/User.controller.js");
// const { AuthGuard } = require("../../Middleware/Authguard.js");

_.route("/registration").post(CreateUser);
_.route("/Login").post(LoginController);
_.route("/OTP_Verify").post(OTPmatchController);
_.route("/ForgetPassword").post(ForgotPassController);

module.exports = _;
