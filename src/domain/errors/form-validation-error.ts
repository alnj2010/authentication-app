export class FormValidationError extends Error {
  public errorMsgs;
  constructor(errorMsgs: Array<string>) {
    super("Form validation failed");
    this.errorMsgs = errorMsgs;
    this.name = "FormValidationError";
  }
}
