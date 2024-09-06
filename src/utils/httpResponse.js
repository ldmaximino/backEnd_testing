const respCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  UNAUTH: 401,
  INT_SERV_ERROR: 500,
};

const errors_Dict = {
  OK: "Success",
  CREATED: "Created",
  NOT_FOUND: "Not Found",
  FORBIDDEN: "Forbidden",
  UNAUTH: "Unauthorized",
  INT_SERV_ERROR: "Internal Server Error",
  UPD: "Updated",
  DEL: "Deleted",
  VALIDPROD: "Product Fields Errors",
  VALIDUSERS: "User Fields Errors"
};

export class HttpResponse {
  Ok(res, data) {
    return res.status(respCode.OK).json({
      status: respCode.OK,
      message: errors_Dict.OK,
      data,
    });
  }

  Created(res, data) {
    return res.status(respCode.CREATED).json({
      status: respCode.CREATED,
      message: errors_Dict.CREATED,
      data,
    });
  }

  Updated(res, data) {
    return res.status(respCode.OK).json({
      status: respCode.OK,
      message: errors_Dict.UPD,
      data,
    });
  }

  Deleted(res, data) {
    return res.status(respCode.OK).json({
      status: respCode.OK,
      message: errors_Dict.DEL,
      data,
    });
  }

  Not_Found(res, data) {
    return res.status(respCode.NOT_FOUND).json({
      status: respCode.NOT_FOUND,
      message: errors_Dict.NOT_FOUND,
      error: data,
    });
  }

  Forbidden(res, data) {
    return res.status(respCode.FORBIDDEN).json({
      status: respCode.FORBIDDEN,
      message: errors_Dict.FORBIDDEN,
      error: data,
    });
  }

  UnAuth(res, data) {
    return res.status(respCode.UNAUTH).json({
      status: respCode.UNAUTH,
      message: errors_Dict.UNAUTH,
      error: data,
    });
  }

  Int_Serv_Error(res, data) {
    return res.status(respCode.INT_SERV_ERROR).json({
      status: respCode.INT_SERV_ERROR,
      message: errors_Dict.INT_SERV_ERROR,
      error: data,
    });
  }

  validatorProducts(res, data) {
    return res.status(respCode.NOT_FOUND).json({
      status: respCode.CREATED,
      message: errors_Dict.VALIDPROD,
      data,
    });
  }

  validatorUsers(res, data) {
    return res.status(respCode.NOT_FOUND).json({
      status: respCode.CREATED,
      message: errors_Dict.VALIDUSERS,
      data,
    });
  }
}

export const httpResponse = new HttpResponse();
