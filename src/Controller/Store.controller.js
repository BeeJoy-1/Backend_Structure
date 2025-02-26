const { MerchantStore } = require("../Model/Marchent.model.js");
const { ApiError } = require("../Utils/ApiError.js");
const { ApiResponse } = require("../Utils/ApiResponse.js");
const { PhoneNoChecker, EmailChecker } = require("../Utils/Checker.js");

//Create Merchant Store Controller

const MerchantStoreController = async (req, res) => {
  try {
    const { Email, Phone, Name, Users } = req.body;
    if (!Email || !EmailChecker(Email)) {
      return res
        .status(404)
        .json(
          new ApiError(false, null, 500, "Email_Adress missing or Invalid!!")
        );
    }
    if (!Name || !Users) {
      return res
        .status(404)
        .json(
          new ApiError(false, null, 500, " Name or User Missing or Invalid!")
        );
    }
    if (!Phone || !PhoneNoChecker(Phone)) {
      return res
        .status(404)
        .json(new ApiError(false, null, 500, "Phone Number Invalid!"));
    }

    //Save info in Database
    const SaveInfo = await new MerchantStore({
      Email,
      Phone,
      Name,
      Users,
    }).save();
    if (SaveInfo) {
      return res
        .status(200)
        .json(
          new ApiResponse(true, SaveInfo, 200, "Data Saved in Database!", null)
        );
    } else {
      return res
        .status(404)
        .json(new ApiError(false, null, 400, `Could't Save Data in Database!`));
    }
  } catch (error) {
    return res
      .status(404)
      .json(
        new ApiError(false, null, 400, `Merchant Controller Error : ${error}`)
      );
  }
};

module.exports = { MerchantStoreController };
