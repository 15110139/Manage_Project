import HttpStatus from "http-status-codes";

const BasicResponse = {
  status: "OK",
  message: "Successfull",
  data: null,
  error: null
};

class ResponseHelper {
  static get HTTP_STATUS() {
    return HttpStatus;
  }

  static getDefaultResponseHandler(res) {
    return {
      onSuccess: function(data, message, code) {
        ResponseHelper.respondWithSuccess(
          res,
          code || ResponseHelper.HTTP_STATUS.OK,
          data,
          message
        );
      },
      onError: function(error) {
        ResponseHelper.respondWithError(
          res,
          error.status || "NOT_FOUND",
          error.message || "Unknown error"
        );
      }
    };
  }

  static respondWithSuccess(res, code, data, message = "Successfull") {
    let response = Object.assign({}, BasicResponse);
    response.status = "OK";
    response.message = message;
    response.data = data;
    res.status(code).json(response);
  }

  static respondWithError(res, errorCode = 500, message = "failure") {
    let response = Object.assign({}, BasicResponse);
    response.success = false;
    response.message = message;
    response.status = "NOT_FOUND";
    res.status(errorCode).json(response);
  }
}
export default ResponseHelper;
