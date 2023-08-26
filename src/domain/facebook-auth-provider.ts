import QueryStringUtil from "@/lib/query-string";
import EnvUtil from "@/lib/env";
import { SocialAuthProvider } from "./social-auth-provider";
import { FACEBOOK_AUTH_URL, FACEBOOK_TOKEN_URL } from "./constants";

class FacebookAuthProvider implements SocialAuthProvider {
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
    
    const data = await response.json();
    return data.id_token;
  }

  generateAuthorizationServerUrl(csrfState: string): string {
    const scopes = ["openid", "email"];
    const query = QueryStringUtil.stringify({
      response_type: "code",
      client_id: EnvUtil.get("FACEBOOK_CLIENT_ID"),
      scope: scopes.join(" "),
      redirect_uri: EnvUtil.get("FACEBOOK_REDIRECT_CODE_URL"),
      state: csrfState,
    });

    return `${FACEBOOK_AUTH_URL}?${query}`;
  }
}

const auth = new FacebookAuthProvider();
export default auth;
