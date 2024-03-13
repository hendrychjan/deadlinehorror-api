export default class AuthenticationError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = "AuthenticationError";
    this.stack = super.stack;
  }
}