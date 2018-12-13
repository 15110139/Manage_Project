export const LIST_SHEME = {
  name: {
    notEmpty: {
      errorMessage: "PROJECT_NAME_IS_EMPTY"
    },
    // isLength: {
    //   options: [{ min: 2, max: 50 }],
    //   errorMessage: "INVAILD_LIST_NAME"
    // }
  },
  projectId: {
    notEmpty: {
      errorMessage: "PROJECT_ID_IS_EMPTY"
    }
  }
};

export const UPDATE_LIST_SHEME = {
  name: {
    notEmpty: {
      errorMessage: "PROJECT_NAME_IS_EMPTY"
    },
    // isLength: {
    //   options: [{ min: 2, max: 50 }],
    //   errorMessage: "INVAILD_LIST_NAME"
    // }
  },
  listId: {
    notEmpty: {
      errorMessage: "LIST_ID_IS_EMPTY"
    }
  }
};
