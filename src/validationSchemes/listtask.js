export const LIST_TASK_SHEME = {
  name: {
    notEmpty: {
      errorMessage: "PROJECT_NAME_IS_EMPTY"
    },
    isLength: {
      options: [{ min: 2, max: 50 }],
      errorMessage: "INVAILD_LIST_TASK_NAME"
    }
  },
  projectId: {
    notEmpty: {
      errorMessage: "PROJECT_ID_IS_EMPTY"
    }
  }
};
