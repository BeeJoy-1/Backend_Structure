const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    Name: {
      type: String,
      required: [true, "Name Required"],
      trim: true,
    },
    Description: {
      type: String,
      required: [true, "Descriptioon Required"],
      trim: true,
    },
    Category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category Required"],
    },
    Price: {
      type: String,
      required: [true, "Price Required"],
      trim: true,
    },
    Discount: {
      type: String,
      required: [true, "Price Required"],
      trim: true,
    },
    Rating: {
      type: Number,
      default: 0,
    },
    Review: [
      {
        type: String,
      },
    ],
    Owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    Store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
    Image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = { ProductModel };
