import QueryStringUtil from "@/lib/query-string";
import EnvUtil from "@/lib/env";
import { SocialAuthProvider } from "./social-auth-provider";
import {
  TWITTER_AUTH_URL,
  TWITTER_ME_URL,
  TWITTER_TOKEN_URL,
} from "./constants";
import HeaderUtil from "@/lib/header";
import { SocialInfo } from "./types";
import { Api } from "@/lib/api";

class TwitterAuthProvider implements SocialAuthProvider {
  constructor() {}
  async getSocialInfoByCode(code: string): Promise<SocialInfo> {
    const access_token = await this.exchangeCodeForToken(code);

    const me = await this.getMeInfoByToken(access_token);

    return {
      name: me.name,
      picture: me.profile_image_url,
      email: me.username + "@false.com",
    };
  }

  private async exchangeCodeForToken(code: string): Promise<string> {
    const body = {
      code,
      code_verifier: "challenge",
      grant_type: "authorization_code",
      redirect_uri: EnvUtil.get("TWITTER_REDIRECT_CODE_URL"),
    };

    const { access_token } = await Api.post(TWITTER_TOKEN_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: HeaderUtil.serializeAuthorizationHeader(
          "Basic",
          EnvUtil.get("TWITTER_CLIENT_ID"),
          EnvUtil.get("TWITTER_CLIENT_SECRET")
        ),
      },
      body: QueryStringUtil.stringify(body),
    });

    return access_token;
  }

  private async getMeInfoByToken(
    token: string
  ): Promise<{ name: string; profile_image_url: string; username: string }> {
    const query = QueryStringUtil.stringify({
      "user.fields": "profile_image_url",
    });
    const { data } = await Api.get(`${TWITTER_ME_URL}?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  generateAuthorizationServerUrl(csrfState: string): string {
    const scopes = ["users.read", "tweet.read"];
    const query = QueryStringUtil.stringify({
      response_type: "code",
      client_id: EnvUtil.get("TWITTER_CLIENT_ID"),
      scope: scopes.join(" "),
      redirect_uri: EnvUtil.get("TWITTER_REDIRECT_CODE_URL"),
      state: csrfState,
      code_challenge: "challenge",
      code_challenge_method: "plain",
    });

    return `${TWITTER_AUTH_URL}?${query}`;
  }
}

const auth = new TwitterAuthProvider();
export default auth;
