export const ADMIN_CONFIRM_WITHDRAW = {
    withDrawId: {
        notEmpty: {
            errorMessage: 'WITHDRAW_ID_NOT_NULL'
        },
        isMongoId: {
            errorMessage: "WITHDRAW_ID_INVALID"
        }
    },
    typeConfirm: {
        notEmpty: {
            errorMessage: 'TYPE_CONFIRM_NOT_NULL'
        }
    }
}

export const VALIDATE_SEARCH_USER = {
    info: {
        notEmpty: {
            errorMessage: 'INFO_NOT_EMPTY'
        }
    }
}