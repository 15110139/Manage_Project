export const SET_BINARY_TREE_VALIDATION_SCHEMA = {
  userId: {
    notEmpty: {
      errorMessage: "USER_ID_IS_EMPTY"
    },
    isMongoId: {
      errorMessage: "USER_ID_IS_INVAILD"
    }
  },
  memberId: {
    notEmpty: {
      errorMessage: "MEMBERS_ID_IS_EMPTY"
    },
    isMongoId: {
      errorMessage: "MEMBERS_ID_IS_INVAILD"
    }
  }
};
