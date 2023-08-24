import { createHash } from "crypto";

class CryptoUtil {
  constructor() {}

  hashPassword(value: string): string {
    return createHash("sha256").update(value).digest("hex");
  }

  generateRandomCode(): string {
    return Math.random().toString(36).substring(7);
  }
}

const util = new CryptoUtil();
export default util;
