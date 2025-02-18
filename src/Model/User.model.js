const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    FirstName: {
      type: String,
      required: [true, "FirstName Missing!"],
      trim: true,
      max: [25, "Too Long!"],
      min: [5, "Too short"],
    },
    LastName: {
      type: String,
      trim: true,
      max: [10, "Too Long!"],
      min: [5, "Too short"],
    },
    Email_Adress: {
      type: String,
      required: [true, "Email_Adress Missing!"],
      trim: true,
      unique: true,
    },
    Mobile: {
      type: Number,
      required: [true, "Mobile number Missing!"],
      trim: true,
      unique: true,
      // max: [11, "Invalid Phone Number"],
    },
    Address: {
      type: String,
      required: [true, "Address Missing!"],
    },
    Password: {
      type: String,
      required: true,
      trim: true,
    },
    OTP: {
      type: Number,
    },
    RefreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified(this.Password)) {
    this.Password = await bcrypt.hash(this.Password, 10);
    next();
  }
  next();
});

UserSchema.methods.isValidatePassword = async (plainPassword) => {
  const PasswordResult = await bcrypt.compare(plainPassword, this.Password);
  return PasswordResult;
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel };
