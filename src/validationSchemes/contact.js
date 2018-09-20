

export const SEND_EMAIL = {
  to: {
      notEmpty: true,
      errorMessage: "TO_NOT_EMPTY",
  },
  subject: {
      notEmpty: true,
      errorMessage: "SUBJECT_NOT_EMPTY"
  },
  html: {
      notEmpty: true,
      errorMessage: "HTML_NOT_EMPTY"
  }
}
