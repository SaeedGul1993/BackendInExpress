const verifyContentTypeMiddleware = (request, response, next) => {
  const getContentType = request.header("Content-Type");
  console.log(getContentType, "getContentType");

  if (!getContentType === "multipart/form-data")
    return response
      .status(400)
      .send({ message: "Bad Request : Content-Type is wrong" });
  next();
};

export { verifyContentTypeMiddleware };
