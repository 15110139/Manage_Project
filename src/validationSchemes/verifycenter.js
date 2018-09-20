const VALIDATE_TYPE_VERIFY_SCHEMA = {
  type: {
    notEmpty: {
      errorMessage: "TYPE_VERIFY_NOT_EMPTY"
    },
    matches: {
      options: [/\b(?:WITHDRAW|LOGIN)\b/],
      errorMessage: "INVALID_TYPE_VERIFY"
    }
  }
};

const ValidateSchema = {
  VALIDATE_TYPE_VERIFY_SCHEMA
};

export { ValidateSchema as default, VALIDATE_TYPE_VERIFY_SCHEMA };
