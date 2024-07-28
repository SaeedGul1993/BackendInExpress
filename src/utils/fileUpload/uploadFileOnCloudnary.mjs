import { v2 as cloudinary } from "cloudinary";

const uploadFileOnCloudnary = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.cloudnaryName,
    api_key: process.env.cloudnaryApiKey,
    api_secret: process.env.cloudnaryApiSecret,
    secure: true,
  });
  try {
    let result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });
    return result;
  } catch (error) {
    console.log(error.message, "cloudnary-----");
  }
};

export { uploadFileOnCloudnary };
