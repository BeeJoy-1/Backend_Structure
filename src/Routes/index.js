const express = require("express");
const { Router } = express;
const _ = Router();
const AuthRoutes = require("./Api/Auth.apiRoutes.js");
const { ApiError } = require("../Utils/ApiError.js");

_.use(process.env.BASE_URL, AuthRoutes);
_.use(process.env.BASE_URL, (req, res) => {
  res.status(400).json(new ApiError(false, null, 404, "Api Routes Invalid!"));
});

module.exports = _;
