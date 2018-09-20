const VALIDATE_SETTINGID_SCHEMA = {
  settingId: {
    notEmpty: {
      errorMessage: "SETTING_ID_NOT_EMPTY"
    },
    isMongoId: {
      errorMessage: "SETTING_ID_INVALID"
    }
  }
};

const VALIDATE_TYPE_TOGGLE_SETTING_SCHEMA = {
  type: {
    notEmpty: {
      errorMessage: "TYPE_TOGGLE_NOT_EMPTY"
    },
    matches: {
      options: [/\b(?:ENABLE|DISABLE)\b/],
      errorMessage: "INVALID_TYPE_TOGGLE"
    }
  }
};

const ValidateSchema = {
  VALIDATE_SETTINGID_SCHEMA,
  VALIDATE_TYPE_TOGGLE_SETTING_SCHEMA
};

export {
  ValidateSchema as default,
  VALIDATE_SETTINGID_SCHEMA,
  VALIDATE_TYPE_TOGGLE_SETTING_SCHEMA
};
