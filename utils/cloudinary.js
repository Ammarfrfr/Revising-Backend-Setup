import { v2 as cloundinary } from "cloudinary";
import fs from "fs"

console.log("ENV TEST:", {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET,
});


cloundinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? "SET" : "MISSING",
});


const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("Uploading to Cloudinary:", localFilePath);

    if(!localFilePath) return null;

    const response = await cloundinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    })

    fs.unlinkSync(localFilePath)
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath)
    return null;
  }
}

export { uploadOnCloudinary }