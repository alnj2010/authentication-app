import QueryStringUtil from "@/lib/query-string";
import EnvUtil from "@/lib/env";
import { FACEBOOK_TOKEN_URL } from "@/domain/constants";

class FacebookAuthUtil {
  constructor() {}

  async exchangeCodeForToken(code: string): Promise<string> {
    const query = QueryStringUtil.stringify({
      code,
      client_id: EnvUtil.get("FACEBOOK_CLIENT_ID"),
      client_secret: EnvUtil.get("FACEBOOK_CLIENT_SECRET"),
      grant_type: "authorization_code",
      redirect_uri: EnvUtil.get("FACEBOOK_REDIRECT_CODE_URL"),
    });

    const response = await fetch(`${FACEBOOK_TOKEN_URL}?${query}`, {
      method: "GET",
    });
    console.log("decodifica el json");

    const data = await response.json();
    return data.id_token;
  }
}

const util = new FacebookAuthUtil();
export default util;
