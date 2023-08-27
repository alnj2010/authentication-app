import QueryStringUtil from "@/lib/query-string";
import EnvUtil from "@/lib/env";
import { SocialAuthProvider } from "./social-auth-provider";
import { GOOGLE_AUTH_URL } from "./constants";
import { ApiError } from "next/dist/server/api-utils";
import { SocialInfo } from "./types";

class GithubAuthProvider implements SocialAuthProvider {
  constructor() {}
  getSocialInfoByCode(code: string): Promise<SocialInfo> {
    throw new ApiError(500, "no implementado");
  }

  generateAuthorizationServerUrl(csrfState: string): string {
    throw new ApiError(500, "no implementado");
  }
}

const auth = new GithubAuthProvider();
export default auth;
