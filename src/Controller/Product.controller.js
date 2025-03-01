const { ApiError } = require("../Utils/ApiError.js");
const { ApiResponse } = require("../Utils/ApiResponse.js");
const { ProductModel } = require("../Model/Product.model.js");

const CreateProductController = async (req, res) => {
  try {
    const Image = req.files;
  } catch (error) {
    return res
      .status(404)
      .json(
        new ApiError(
          false,
          null,
          400,
          ` Create Product Controller Error : ${error}`
        )
      );
  }
};

// return res
// .status(200)
// .json(
//   new ApiResponse(
//     true,
//     AllCategory,
//     200,
//     "All Categories Fetched Successfully!",
//     null
//   )
// );

module.exports = { CreateProductController };
