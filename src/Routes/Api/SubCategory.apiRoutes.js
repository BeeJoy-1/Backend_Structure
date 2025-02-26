const express = require("express");
const { Router } = express;
const _ = Router();
const {
  CreateSubCatController,
  GetAllSubCatController,
  DeleteSubCategory,
} = require("../../Controller/SubCategory.controller");

//Routes

_.route("/SubCategory").post(CreateSubCatController);
_.route("/AllSubCategory").get(GetAllSubCatController);
_.route("/DeleteSubCategory/:id").delete(DeleteSubCategory);

module.exports = _;
