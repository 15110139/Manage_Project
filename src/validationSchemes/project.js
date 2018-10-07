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

export const ADD_MEMBERS_TO_PROJECT = {
  userId: {
    notEmpty: {
      errorMessage: "USER_ID_IS_EMPTY"
    }
  },
  projectId: {
    notEmpty: {
      errorMessage: "PROJECT_ID_IS_EMPTY"
    }
  }
};
