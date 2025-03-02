const fs = require("fs");
const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const UploadCloudinary = async (localfilePath = "public\\temp\\black.jpg") => {
  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(
      localfilePath ||
        "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg"
    );

    //Delete a Temp Image
    fs.unlinkSync(`${localfilePath}`, (err) => {
      if (err) {
        console.log("Image Unlinksync error", err);
      }
    });

    return uploadResult;
  } catch (error) {
    console.log("From Cloudinary Uploader error: ", error);
  }
};

//Delete Image from Cloudinary
const DeleteImageCloudinary = async (imagePath) => {
  try {
    cloudinary.v2.api
      .delete_resources(["fn0tk9zvvts8llelkoiu"], {
        type: "upload",
        resource_type: "image",
      })
      .then(console.log);
  } catch (error) {
    console.log("From Cloudinary Delete error: ", error);
  }
};

module.exports = { UploadCloudinary };
