export class InternalONotFoundApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalONotFoundApiError";
  }
}
