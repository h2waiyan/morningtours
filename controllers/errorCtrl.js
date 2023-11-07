const AppError = require("../utils/apperror");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      err: err,
      errorStack: err.stack,
    });
  };

  const sendErrorProd = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  };

  if (process.env.NODE_ENV == "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV == "production") {
    if (err.name == "JsonWebTokenError" || "TokenExpiredError") {
      err = new AppError(
        `${err.message.toUpperCase()}. Please login again`,
        401
      );
    }
    sendErrorProd(err, res);
  }
};
