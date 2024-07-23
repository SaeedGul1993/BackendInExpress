const addNoteValidationSchema = {
  title: {
    notEmpty: {
      errorMessage: "title should not be empty.",
    },
    isString: {
      errorMessage: "title should be string.",
    },
  },
  description: {
    notEmpty: {
      errorMessage: "description should not be empty.",
    },
    isString: {
      errorMessage: "description should be string.",
    },
  },
};

export { addNoteValidationSchema };
