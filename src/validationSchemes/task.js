export const TASK_SHEME = {
  title: {
    notEmpty: true,
    errorMessage: "TASK_TITLE_IS_EMPTY",
    isLength: {
      options: [{ min: 2, max: 50 }],
      errorMessage: "INVAILD_TASK_TITLE"
    }
  },
  listId: {
    notEmpty: {
      errorMessage: "LIST_ID_IS_EMPTY"
    }
  },
  projectId: {
    notEmpty: {
      errorMessage: "PROJECT_ID_IS_EMPTY"
    }
  }
};

export const ADD_MEMBERS_TO_TASK_SHEME = {
  userId: {
    notEmpty: true,
    errorMessage: "USER_ID_IS_EMPTY"
  },
  taskId: {
    notEmpty: true,
    errorMessage: "TASK_ID_IS_EMPTY"
  }
};

export const SWITCH_TASK_BETWEEN_TWO_LIST = {
  listId: {
    notEmpty: true,
    errorMessage: "LIST_ID_IS_EMPTY"
  },
  taskId: {
    notEmpty: true,
    errorMessage: "TASK_ID_IS_EMPTY"
  }
};
