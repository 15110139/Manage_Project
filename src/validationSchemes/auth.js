export const  LOGIN_VALIDATION_SCHEMA = {
  email: {
    notEmpty: true,
    isEmail: {
      errorMessage: "INVAILD_EMAIL_PROVIDED"
    },
    errorMessage: "EMAIL_NOT_EMPTY"
  },
  password: {
    notEmpty: true,
    isLength: {
      options: [{ min: 6, max: 35 }],
      errorMessage: "INVAILD_PASSWORD_PROVIDED"
    },
    errorMessage: "PASSWORD_NOT_EMPTY"
  }
};
export const RESET_PASSWORD_SCHEMA = {
  email: {
    notEmpty: true,
    isEmail: {
      errorMessage: "INVAILD_EMAIL_PROVIDED"
    },
    errorMessage: "EMAIL_NOT_EMPTY"
  }
};

export const REGISTER_VALIDATION_SCHEMA = {
  email: {
    notEmpty: true,
    isEmail: {
      errorMessage: "INVAILD_EMAIL_PROVIDED"
    },
    errorMessage: "EMAIL_NOT_EMPTY"
  },
  username: {
    notEmpty: true,
    isLength: {
      options: [{ min: 6, max: 35 }],
      errorMessage: "INVAILD_USERNAME_PROVIDED"
    },
    errorMessage: "USERNAME_NOT_EMPTY"
  },
  password: {
    notEmpty: true,
    isLength: {
      options: [{ min: 6, max: 35 }],
      errorMessage: "INVAILD_PASSWORD_PROVIDED"
    },
    errorMessage: "PASSWORD_NOT_EMPTY"
  }
};

export const UPDATE_AVATAR_VALIDATE_SCHEMA = {
  avatarUrl: {
    notEmpty: true,
    errorMessage: "AVATARURL_NOT_EMPTY"
  }
};
export const CHANGE_PASSWORD_SCHEMA = {
  oldPassword: {
    notEmpty: true,
    isLength: {
      options: [{ min: 6, max: 35 }],
      errorMessage: "INVAILD_OLD_PASSWORD_PROVIDED"
    },
    errorMessage: "OLD_PASSWORD_NOT_EMPTY"
  },
  newPassword: {
    notEmpty: true,
    isLength: {
      options: [{ min: 6, max: 35 }],
      errorMessage: "INVAILD_NEW_PASSWORD_PROVIDED"
    },
    errorMessage: "NEW_PASSWORD_NOT_EMPTY"
  }
};

export const VERIFY_EMAIL_SCHEMA = {
  email: {
    notEmpty: {
      errorMessage: "EMAIL_IS_EMPTY"
    },
    isEmail: {
      errorMessage: "INVALID_EMAIL"
    }
  },
  codeVerify: {
    notEmpty: {
      errorMessage: "CODE_VERIFY_NOT_EMPTY"
    }
  }
};

export const EMAIL_VALIDATE_SCHEMA = {
  email: {
    notEmpty: {
      errorMessage: "EMAIL_IS_EMPTY"
    },
    isEmail: {
      errorMessage: "INVALID_EMAIL"
    }
  }
};
