const { ApiError } = require("../Utils/ApiError.js");
const { ApiResponse } = require("../Utils/ApiResponse.js");
const { asyncHandeller } = require("../Utils/asyncHandeller.js");
const { UserModel } = require("../Model/User.model.js");

/**
 *todo : createUser controller implement
 * @param {{req.body}} req
 * @param {*} res
 */

const CreateUser = asyncHandeller(async (req, res, next) => {
  const { FirstName, LastName, Email_Adress, Mobile, Address, Password } =
    req?.body;

  //send Data to database
  try {
    if (!FirstName) {
      return res
        .status(404)
        .json(new ApiError(false, null, 500, "FirstName Missing!!"));
    }
    if (!LastName) {
      return res
        .status(404)
        .json(new ApiError(false, null, 500, "LastName Missing!!"));
    }
    if (!Email_Adress) {
      return res
        .status(404)
        .json(new ApiError(false, null, 500, "Email_Adress Missing!!"));
    }
    if (!Mobile) {
      return res
        .status(404)
        .json(new ApiError(false, null, 500, "Mobile Missing!!"));
    }
    if (!Address) {
      return res
        .status(404)
        .json(new ApiError(false, null, 500, "Address Missing!!"));
    }
    if (!Password) {
      return res
        .status(404)
        .json(new ApiError(false, null, 500, "Password Missing!!"));
    }

    //check if User Already exists or not

    const ExistUser = await UserModel.find({
      $or: [{ FirstName: FirstName }, { Email_Adress: Email_Adress }],
    });

    if (ExistUser?.length) {
      return res
        .status(404)
        .json(
          new ApiError(
            false,
            null,
            400,
            `${ExistUser[0]?.FirstName} Already Exists!`
          )
        );
    }

    const Users = await new UserModel({
      FirstName,
      LastName,
      Email_Adress,
      Mobile,
      Address,
      Password,
    }).save();
    if (Users) {
      const RecentCreatedUser = await UserModel.find({
        $or: [{ FirstName: FirstName }, { Email_Adress: Email_Adress }],
      }).select("-Password -_id");
      return res
        .status(200)
        .json(
          new ApiResponse(
            true,
            RecentCreatedUser,
            200,
            "Users Created Successfully",
            null
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
          `Registration controller error : ${error}`
        )
      );
  }
});

module.exports = { CreateUser };
