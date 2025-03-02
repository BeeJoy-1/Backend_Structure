const express = require("express");
const { Router } = express;
const _ = Router();
const { upload } = require("../../Middleware/Multer.middleware");
const {
  CreateProductController,
  GetAllProduct,
  UpdateProduct,
} = require("../../Controller/Product.controller");

//Routes
_.route("/Products").post(
  upload.fields([{ name: "Image", maxCount: 10 }]),
  CreateProductController
);
_.route("/GetAllProduct").get(GetAllProduct);
_.route("/UpdateProduct/:id").patch(
  upload.fields([{ name: "Image", maxCount: 10 }]),
  UpdateProduct
);

module.exports = _;
