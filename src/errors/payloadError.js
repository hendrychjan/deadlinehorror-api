export default class PayloadError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = "PayloadError";
    this.stack = super.stack;
  }
}