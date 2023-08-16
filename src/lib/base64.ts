class Base64Util {
  constructor() {}

  encode(value: string): string {
    let buff = Buffer.from(value);
    return buff.toString("base64");
  }

  decode(value: string): string {
    return Buffer.from(value, "base64").toString("ascii");
  }
}

const util = new Base64Util();
export default util;
