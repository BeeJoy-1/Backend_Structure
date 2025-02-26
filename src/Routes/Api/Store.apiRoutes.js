const express = require("express");
const {
  MerchantStoreController,
} = require("../../Controller/Store.controller");
const _ = express.Router();

//Routes
_.route("/MerchantRole").post(MerchantStoreController);

module.exports = _;
