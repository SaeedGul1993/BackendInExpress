const createPaymentCardValidator = {
  name: {
    notEmpty: {
      errorMessage: "name should not be empty.",
    },
    isString: {
      errorMessage: "name should be string.",
    },
  },
  number: {
    isLength: {
      options: {
        min: 16,
        max: 16,
      },
      errorMessage: "cardNumber must be 16 digits.",
    },
    notEmpty: {
      errorMessage: "cardNumber should not be empty.",
    },
  },
  exp_month: {
    notEmpty: {
      errorMessage: "exp_month should not be empty.",
    },
  },
  exp_year: {
    notEmpty: {
      errorMessage: "exp_year should not be empty.",
    },
  },
  cvc: {
    notEmpty: {
      errorMessage: "exp_month should not be empty.",
    },
  },
};

export { createPaymentCardValidator };
