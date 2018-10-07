export const VALIDATE_CREATE_TEMPLATE_SCHEMA = {
    content: {
        notEmpty: {
            errorMessage: "CONTENT_NOT_EMPTY"
        }
    },
    subject: {
        notEmpty: {
            errorMessage: "SUBJECT_NOT_EMPTY"
        }
    },
    from: {
        notEmpty: {
            errorMessage: "FROM_NOT_EMPTY"
        }
    },
    templateName: {
        notEmpty: {
            errorMessage: "TEMPLATE_NAME_NOT_EMPTY"
        }
    }
}

export const VALIDATE_TEMPLATE_NAME_SCHEMA = {
    templateName: {
        notEmpty: {
            errorMessage: "TEMPLATE_NAME_NOT_EMPTY"
        }
    }
}