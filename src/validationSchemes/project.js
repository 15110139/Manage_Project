export const PROJECT_SHEME = {
  name: {
    notEmpty: {
      errorMessage: "PROJECT_NAME_IS_EMPTY"
    },
    isLength: {
      options: [{ min: 2, max: 50 }],
      errorMessage: "INVAILD_PROJECT_NAME"
    }
  }
};
