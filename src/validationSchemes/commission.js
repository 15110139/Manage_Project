export const WITHDRAW_COMISSION_VALIDATE_SHEME = {
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

export const CALCULATE_COMISSION_VALIDATE_SHEME = {
    profitNumber : {
        notEmpty: {
            errorMessage: "PROFITNUMBER_NOT_EMPTY"
        },
        isFloat: {
            options: {gt: 0},
            errorMessage: "PROFITNUMBER_GREATER_0"
        }
    }
}