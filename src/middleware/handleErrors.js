import AuthenticationError from "../errors/authenticationError.js";
import PayloadError from "../errors/payloadError.js";

export const handleErrors = (err, req, res, next) => {
  console.error(err);

  // Initially set the status code to 500
  let statusCode = 500;

  if (err instanceof PayloadError) {
    statusCode = 400;
  }

  if (err instanceof AuthenticationError) {
    statusCode = 401;
  }

  res.status(statusCode);

  if (statusCode === 500) {
    res.send("Something went wrong.");
  } else {
    res.send(err.message);
  }
};
