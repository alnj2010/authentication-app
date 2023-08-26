import QueryStringUtil from "@/lib/query-string";
import EnvUtil from "@/lib/env";
import { SocialAuthProvider } from "./social-auth-provider";
import { GOOGLE_AUTH_URL } from "./constants";
import { ApiError } from "next/dist/server/api-utils";

class TwitterAuthProvider implements SocialAuthProvider {
  constructor() {}
  exchangeCodeForToken(code: string): Promise<string> {
    throw new ApiError(500, "no implementado");
  }

  generateAuthorizationServerUrl(csrfState: string): string {
    throw new ApiError(500, "no implementado");
  }
}

const auth = new TwitterAuthProvider();
export default auth;
