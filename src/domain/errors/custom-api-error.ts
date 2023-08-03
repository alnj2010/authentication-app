export class CustomApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}
