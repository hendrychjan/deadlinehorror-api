import AuthenticationError from "../errors/authenticationError.js";
import AuthorizationError from "../errors/authorizationError.js";
import PayloadError from "../errors/payloadError.js";
import NotFoundError from "../errors/notFoundError.js";

export const handleErrors = (err, req, res, next) => {
  // Initially set the status code to 500
  let statusCode = 500;

  if (err instanceof PayloadError) {
    statusCode = 400;
  }

  if (err instanceof AuthenticationError) {
    statusCode = 401;
  }

  if (err instanceof AuthorizationError) {
    statusCode = 403;
  }

  if (err instanceof NotFoundError) {
    statusCode = 404;
  }

  res.status(statusCode);

  if (statusCode === 500) {
    res.send("Something went wrong.");
    console.error("[SYSTEM ERROR] " + err);
  } else {
    res.send(err.message);
    console.error("[CLIENT ERROR] " + err);
  }
};
