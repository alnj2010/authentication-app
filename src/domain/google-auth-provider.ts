import QueryStringUtil from "@/lib/query-string";
import EnvUtil from "@/lib/env";
import { SocialAuthProvider } from "./social-auth-provider";
import { GOOGLE_AUTH_URL, GOOGLE_TOKEN_URL } from "./constants";

class GoogleAuthProvider implements SocialAuthProvider {
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

  generateAuthorizationServerUrl(csrfState: string): string {
    const scopes = ["openid", "email", "profile"];
    const query = QueryStringUtil.stringify({
      response_type: "code",
      client_id: EnvUtil.get("GOOGLE_CLIENT_ID"),
      scope: scopes.join(" "),
      redirect_uri: EnvUtil.get("GOOGLE_REDIRECT_CODE_URL"),
      state: csrfState,
    });

    return `${GOOGLE_AUTH_URL}?${query}`;
  }
}

const auth = new GoogleAuthProvider();
export default auth;
