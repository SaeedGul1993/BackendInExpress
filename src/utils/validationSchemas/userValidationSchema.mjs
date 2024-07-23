const registerUserValidationSchema = {
  fullName: {
    isLength: {
      options: {
        min: 2,
        max: 32,
      },
      errorMessage: "FullName must be greater than 2 and less than 15.",
    },
    notEmpty: {
      errorMessage: "FullName should not be empty.",
    },
    isString: {
      errorMessage: "FullName should be string.",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "email should not be empty.",
    },
    isString: {
      errorMessage: "email should be string.",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password should not be empty.",
    },
  },
};

const userLoginValidationSchema = {
  email: {
    notEmpty: {
      errorMessage: "email should not be empty.",
    },
    isString: {
      errorMessage: "email should be string.",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password should not be empty.",
    },
  },
};

const forgotPasswordValidationSchema = {
  email: {
    notEmpty: {
      errorMessage: "email should not be empty.",
    },
    isString: {
      errorMessage: "email should be string.",
    },
  },
};

const changePasswordValidationSchema = {
  email: {
    notEmpty: {
      errorMessage: "email should not be empty.",
    },
    isString: {
      errorMessage: "email should be string.",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password should not be empty.",
    },
  },
  otp: {
    notEmpty: {
      errorMessage: "otp should not be empty.",
    },
  },
};

export {
  registerUserValidationSchema,
  userLoginValidationSchema,
  forgotPasswordValidationSchema,
  changePasswordValidationSchema,
};
