export const INVEST_VALIDATE_SCHEMA = {
    amount: {
        notEmpty: {
            errorMessage: "AMOUNT_NOT_EMPTY"
        },
        isFloat: {
            options: { gt: 0 },
            errorMessage: "AMOUNT_GREATER_0"
        }
    }
}

export const WITHDRAW_INVEST_VALIDATE_SCHEMA = {
    investId: {
        notEmpty: true,
        errorMessage: "INVESTID_NOT_EMPTY"
    }
}