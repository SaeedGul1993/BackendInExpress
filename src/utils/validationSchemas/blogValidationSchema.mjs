const createBlogValidationSchema = {
  title: {
    notEmpty: {
      errorMessage: "title should not be empty.",
    },
    isString: {
      errorMessage: "title should be string.",
    },
  },
  content: {
    notEmpty: {
      errorMessage: "content should not be empty.",
    },
    isString: {
      errorMessage: "content should be string.",
    },
  },
};

export { createBlogValidationSchema };
