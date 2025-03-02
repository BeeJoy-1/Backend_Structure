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

    //Find Existed Product
    const ExistedProduct = await ProductModel.find({ Name: req.body.Name });
    if (ExistedProduct?.length) {
      return res
        .status(404)
        .json(new ApiError(false, null, 400, ` Product Already Exists!`));
    }

    const ImageInfo = await UploadCloudinary(Image[0].path);

    //Save Date in Database
    const SaveData = await new ProductModel({
      ...req.body,
      Image: ImageInfo.secure_url,
    }).save();

    if (SaveData) {
      return res
        .status(202)
        .json(
          new ApiResponse(
            true,
            SaveData,
            200,
            "Product Created Successfully",
            null
          )
        );
    }
    return res
      .status(404)
      .json(new ApiError(false, null, 400, ` Product Couldnt be Created!`));
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
