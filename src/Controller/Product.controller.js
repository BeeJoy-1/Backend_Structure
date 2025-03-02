const { ApiError } = require("../Utils/ApiError.js");
const { ApiResponse } = require("../Utils/ApiResponse.js");
const { ProductModel } = require("../Model/Product.model.js");
const { UploadCloudinary } = require("../Utils/Cloudinary.js");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

//Create Product Controller
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
      //Delete Cache Memory
      myCache.del("AllProduct");
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

//Get all Product Controller
const GetAllProduct = async (req, res) => {
  try {
    const value = myCache.get("AllProduct");
    if (value === undefined) {
      const AllProduct = await ProductModel.find({});
      if (AllProduct) {
        //Cached The Products
        myCache.set("AllProduct", JSON.stringify(AllProduct));
        return res
          .status(202)
          .json(
            new ApiResponse(true, AllProduct, 200, "Got All Products!", null)
          );
      }
    } else {
      return res
        .status(202)
        .json(
          new ApiResponse(
            true,
            JSON.parse(value),
            400,
            `Got All Products but Faster lol!`
          )
        );
    }
  } catch (error) {
    return res
      .status(404)
      .json(
        new ApiError(
          false,
          null,
          400,
          ` Get All Product Controller Error : ${error}`
        )
      );
  }
};

//Update Product Controller
const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const Image = req.files?.Image;
    if (!Image) {
      return res
        .status(404)
        .json(new ApiError(false, null, 400, ` Image Not Found!`));
    }
    if (Image) {
      ImageInfo = await UploadCloudinary(Image[0].path);
    }

    const UpdateProductObject = { ...req.body, Image: ImageInfo?.secure_url };
    const UpdateProduct = await ProductModel.findById(id);
    console.log(UpdateProduct);

    if (UpdateProduct) {
      return res
        .status(202)
        .json(
          new ApiResponse(
            true,
            UpdateProduct,
            200,
            "Product Updated Successfully!",
            null
          )
        );
    }
    return res
      .status(404)
      .json(new ApiError(false, null, 400, `Updating Product Failed!`));
  } catch (error) {
    return res
      .status(404)
      .json(
        new ApiError(
          false,
          null,
          400,
          ` Get All Product Controller Error : ${error}`
        )
      );
  }
};

module.exports = { CreateProductController, GetAllProduct, UpdateProduct };
