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
  } catch (error) {
    console.log("From Cloudinary Uploader error: ", error);
  }
};

module.exports = { UploadCloudinary };
