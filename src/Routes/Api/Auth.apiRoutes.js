const express = require("express");
const { Router } = express;
const _ = Router();
const { ApiResponse } = require("../../Utils/ApiResponse.js");
const {
  CreateUser,
  LoginController,
} = require("../../Controller/User.controller.js");
const { AuthGuard } = require("../../Middleware/Authguard.js");

_.route("/registration").post(CreateUser);
_.route("/Login").post(AuthGuard, LoginController);

module.exports = _;
