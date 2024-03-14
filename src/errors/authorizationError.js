export default class AuthorizationError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = "AuthorizationError";
    this.stack = super.stack;
  }
}