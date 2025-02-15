const express = require("express");
const { Router } = express;
const _ = Router();
const { ApiResponse } = require("../../Utils/ApiResponse.js");
const { CreateUser } = require("../../Controller/User.controller.js");

_.route("/registration").post(CreateUser);

module.exports = _;
