// module.exports = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error';
//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
// };

const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicationErrorDB = (err) => {
  const message = `Duplicate Field Value: ${err.keyValue.name}. Please use an other value`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid Input Data ${errors.join('. ')}`;

  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational errors
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming errors.
    // console.err for us developers to see in prooduction console
    console.error('Error💥', err);

    //  we dont want to leak the info to users
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV == 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV == 'production') {
    // HANDLING MONGOOSE ERRORS AS OPERATIONAL ERRORS
    let error = Object.create(err);

    // FOR ID = SOME INVALID IDS
    if (err.name === 'CastError') {
      error = handleCastErrorDB(error);
      // sendErrorProd(error1, res);
    }

    // FOR DUPLICATE DOCUMENTS
    if (err.code === 11000) {
      error = handleDuplicationErrorDB(error);
      // sendErrorProd(errorValidation, res);
    }

    // FOR VALID DATA INPUTS OF TOURSCHEMA OF MONGOOSE

    if (err.name === 'ValidationError') {
      error = handleValidationError(error);
    }

    // FINALLY THE UPDATES ERROR OBJECT IS SENT TO PRODUCTION ERROR HANDLER AS OPERATIONAL / PROGRAMMING ERRORS
    sendErrorProd(error, res);
  }

  next();
};
