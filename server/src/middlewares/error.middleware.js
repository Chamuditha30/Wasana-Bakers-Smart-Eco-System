//create error handler for centrelize error handling
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  //handle duplicate key errors
  if (err.code === 11000) {
    return res.status(409).json({
      message: "A record with this value already exists",
    });
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Something went wrong",
  });
};
