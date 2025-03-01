const { ApiError } = require("../Utils/ApiError.js");
const { ApiResponse } = require("../Utils/ApiResponse.js");
const { ProductModel } = require("../Model/Product.model.js");
const { UploadCloudinary } = require("../Utils/Cloudinary.js");

const CreateProductController = async (req, res) => {
  try {
    NonRequiredItem = ["Review", "Rating", "Discount", "SubCategory"];

    //Dynamic Validation using loop(New Concept)

    for (let key in req.body) {
      if (NonRequiredItem.includes(key)) {
        continue;
      }
      if (!req.body[key]) {
        return res
          .status(400)
          .json(new ApiResponse(true, null, 200, `${key} Missing!!`, null));
      }
    }

    const Image = req.files?.Image;
    if (!Image) {
      return res
        .status(404)
        .json(new ApiError(false, null, 400, ` Image Not Found!`));
    }

    const ImageInfo = await UploadCloudinary(Image[0].path);
    console.log(ImageInfo?.secure_url);
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

module.exports = { CreateProductController };
