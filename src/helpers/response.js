import HttpStatus from "http-status-codes";

const BasicResponse = {
  status: "Successfull",
  data: null,
  error: null
};

class ResponseHelper {
  static get HTTP_STATUS() {
    return HttpStatus;
  }

  static getDefaultResponseHandler(res) {
    return {
      onSuccess: function(data) {
        ResponseHelper.respondWithSuccess(res, data);
      },
      onError: function(error, status, errorCode) {
        ResponseHelper.respondWithError(
          res,
          error || null,
          status ? status.message : null,
          errorCode
        );
      }
    };
  }

  static respondWithSuccess(res, data) {
    let response = Object.assign({}, BasicResponse);
    response.data = data;
    response.status = status;
    res.status(200).json(response);
  }

  static respondWithError(res, error, status, errorCode = 500) {
    let response = Object.assign({}, BasicResponse);
    response.status = status;
    response.error = error;
    res.status(errorCode).json(response);
  }
}
export default ResponseHelper;
