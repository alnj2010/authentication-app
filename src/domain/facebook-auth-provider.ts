import QueryStringUtil from "@/lib/query-string";
import EnvUtil from "@/lib/env";
import { SocialAuthProvider } from "./social-auth-provider";
import { FACEBOOK_AUTH_URL, FACEBOOK_TOKEN_URL } from "./constants";
import TokenUtil from "@/lib/token";
import { SocialInfo } from "./types";
import { Api } from "@/lib/api";

class FacebookAuthProvider implements SocialAuthProvider {
  constructor() {}
  async getSocialInfoByCode(code: string): Promise<SocialInfo> {
    const query = QueryStringUtil.stringify({
      code,
      client_id: EnvUtil.get("FACEBOOK_CLIENT_ID"),
      client_secret: EnvUtil.get("FACEBOOK_CLIENT_SECRET"),
      grant_type: "authorization_code",
      redirect_uri: EnvUtil.get("FACEBOOK_REDIRECT_CODE_URL"),
    });

    const { id_token } = await Api.get(`${FACEBOOK_TOKEN_URL}?${query}`);

    const payload = TokenUtil.decode(id_token);
    return {
      email: payload.email,
      picture: payload.picture,
      name: payload.name,
    };
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
