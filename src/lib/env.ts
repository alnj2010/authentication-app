class EnvUtil {
  constructor() {}

  get(key: string): string {
    return process.env[key] as string;
  }
}

const util = new EnvUtil();
export default util;
