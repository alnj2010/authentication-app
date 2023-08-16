import { createHash } from "crypto";

class CryptoUtil {
  constructor() {}

  hashPassword(value: string): string {
    return createHash("sha256").update(value).digest("hex");
  }
}

const util = new CryptoUtil();
export default util;
