import { matchedData, validationResult } from "express-validator";
import { uploadFileOnCloudnary } from "../utils/fileUpload/uploadFileOnCloudnary.mjs";
import { Blog } from "../db/blogModel.mjs";

const createBlogController = async (request, response) => {
  const { user, file } = request;
  const result = validationResult(request);
  if (!result.isEmpty())
    return response.status(400).send({ message: result.array() });
  const data = matchedData(request);
  try {
    let uploadFile = "";
    if (file) {
      uploadFile = await uploadFileOnCloudnary(file?.path);
    }
    let blogPayload = {
      ...data,
      userId: user?._id,
      image: file ? uploadFile?.secure_url : null,
    };
    await Blog.create(blogPayload);
    return response.status(201).send({
      message: "Your blog is created successfully",
      data: blogPayload,
    });
  } catch (error) {
    console.log(error, "error");
    return response.sendStatus(500);
  }
};

export { createBlogController };
