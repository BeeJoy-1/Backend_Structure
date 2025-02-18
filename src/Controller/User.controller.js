const { ApiError } = require("../Utils/ApiError.js");
const { ApiResponse } = require("../Utils/ApiResponse.js");
const { asyncHandeller } = require("../Utils/asyncHandeller.js");
const { UserModel } = require("../Model/User.model.js");
const { EmailChecker, PasswordChecker } = require("../Utils/Checker.js");
const { bcryptPassword, generateToken } = require("../Helper/Helper.js");

/**
 *todo : createUser controller implement
 * @param {{req.body}} req
 * @param {*} res
 */

const options = {
  httpOnly: true,
  secure: true,
};

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
    if (!Email_Adress || !EmailChecker(Email_Adress)) {
      return res
        .status(404)
        .json(
          new ApiError(false, null, 500, "Email_Adress missing or Invalid!!")
        );
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
    if (!Password || !PasswordChecker(Password)) {
      return res
        .status(404)
        .json(
          new ApiError(
            false,
            null,
            500,
            "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number:"
          )
        );
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

    //Password encrypt

    const HashPassword = await bcryptPassword(Password);

    // create a new user in database
    const Users = await new UserModel({
      FirstName,
      LastName,
      Email_Adress,
      Mobile,
      Address,
      Password: HashPassword,
    }).save();

    //Create Access Token
    let AccessToken = await generateToken(Email_Adress, Mobile);

    if (Users || AccessToken) {
      // set token in database
      const setToken = await UserModel.findOneAndUpdate(
        { _id: Users._id },
        { $set: { Token: AccessToken } },
        { new: true }
      );

      const RecentCreatedUser = await UserModel.find({
        $or: [{ FirstName: FirstName }, { Email_Adress: Email_Adress }],
      }).select("-Password -_id");
      return res
        .status(200)
        .cookie("Token", AccessToken, options)
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
