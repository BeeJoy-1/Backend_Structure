const express = require("express");
const { Router } = express;
const _ = Router();
const { ApiResponse } = require("../../Utils/ApiResponse.js");

_.route("/getName").get((req, res) => {
  res.status(200).json(new ApiResponse(true, "Exclusive", 200, "All good"));
});

module.exports = _;
