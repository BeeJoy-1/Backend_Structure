const express = require("express");
const { Router } = express;
const _ = Router();
const { upload } = require("../../Middleware/Multer.middleware");
const {
  CreateProductController,
} = require("../../Controller/Product.controller");

//Routes
_.route("/Products").post(
  upload.fields([{ name: "Image", maxCount: 10 }]),
  CreateProductController
);

module.exports = _;
