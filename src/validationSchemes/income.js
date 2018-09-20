export const WITHDRAW_INCOME_VALIDATE_SHEME = {
    amount : {
        notEmpty: {
            errorMessage: "AMOUNT_NOT_EMPTY"
        },
        isFloat: {
            options: {gt: 0},
            errorMessage: "AMOUNT_GREATER_0"
        }
    }
}