export const VALIDATE_CREATE_CALENDAR_SELL_TOKEN = {
    totalToken : {
        notEmpty: {
            errorMessage: "TOTAL_TOKEN_NOT_EMPTY"
        },
        isDecimal : {
            errorMessage: "TOTAL_TOKEN_MUST_IS_NUMBER"
        }
    },
    startTime: {
        notEmpty: {
            errorMessage: "START_TIME_NOT_EMPTY"
        },
    },
    endTime : {
        notEmpty: {
            errorMessage: "END_TIME_NOT_EMPTY"
        },
    }
}

export const VALIDATE_DELETE_CALENDAR = {
    calendarId : {
        notEmpty: {
            errorMessage: "CALENDAR_ID_NOT_EMPTY"
        },
        isMongoId: {
            errorMessage: "CALENDAR_ID_NOT_VALID"
        }
    }
}