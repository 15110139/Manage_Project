export const UPDATE_SYSTEM_CONFIG_VALIDATION_SCHEMA = {
    key: {
        notEmpty: true,
        errorMessage: "KEY_NOT_EMPTY"
    }
};

export const UPDATE_VALUE_SYSTEM_CONFIG_VALIDATION_SCHEMA = {
    value: {
        notEmpty: true,
        errorMessage: "VALUE_NOT_EMPTY"
    }
}
