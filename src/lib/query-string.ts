import querystring from "node:querystring";

class QueryStringUtil {
  constructor() {}

  stringify(value: Record<string, any>): string {
    return querystring.stringify(value);
  }
}

const util = new QueryStringUtil();
export default util;
