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
  if (!FirstName) {
    res.status(404).json(new ApiError(false, null, 500, "FirstName Missing!!"));
  }
  if (!LastName) {
    res.status(404).json(new ApiError(false, null, 500, "LastName Missing!!"));
  }
  if (!Email_Adress) {
    res
      .status(404)
      .json(new ApiError(false, null, 500, "Email_Adress Missing!!"));
  }
  if (!Mobile) {
    res.status(404).json(new ApiError(false, null, 500, "Mobile Missing!!"));
  }
  if (!Address) {
    res.status(404).json(new ApiError(false, null, 500, "Address Missing!!"));
  }
  if (!Password) {
    res.status(404).json(new ApiError(false, null, 500, "Password Missing!!"));
  }

  //send Data to database
  try {
    const Users = await new UserModel({
      FirstName,
      LastName,
      Email_Adress,
      Mobile,
      Address,
      Password,
    }).save();
    if (Users) {
      return res
        .status(200)
        .json(
          new ApiResponse(true, Users, 200, "Users Created Successfully", null)
        );
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = { CreateUser };
