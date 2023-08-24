import QueryStringUtil from "@/lib/query-string";
import EnvUtil from "@/lib/env";
import { GOOGLE_TOKEN_URL } from "@/domain/constants";

class GoogleAuthUtil {
  constructor() {}

  async exchangeCodeForToken(code: string): Promise<string> {
    const body = {
      code,
      client_id: EnvUtil.get("GOOGLE_CLIENT_ID"),
      client_secret: EnvUtil.get("GOOGLE_CLIENT_SECRET"),
      grant_type: "authorization_code",
      redirect_uri: EnvUtil.get("GOOGLE_REDIRECT_CODE_URL"),
    };

    const response = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: QueryStringUtil.stringify(body),
    });

    const data = await response.json();

    return data.id_token;
  }
}

const util = new GoogleAuthUtil();
export default util;
