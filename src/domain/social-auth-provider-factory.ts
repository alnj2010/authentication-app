import { ApiError } from "next/dist/server/api-utils";
import { SERVICE_ERROR_NOT_FOUND } from "./constants";
import { SocialAuthProvider } from "./social-auth-provider";
import GoogleAuthProvider from "./google-auth-provider";
import FacebookAuthProvider from "./facebook-auth-provider";
import TwitterAuthProvider from "./twitter-auth-provider";
import GithubAuthProvider from "./github-auth-provider";

class SocialAuthProviderFactory {
  constructor() {}

  get(provider: string): SocialAuthProvider {
    switch (provider) {
      case "google":
        return GoogleAuthProvider;
      case "facebook":
        return FacebookAuthProvider;
      case "twitter":
        return TwitterAuthProvider;
      case "github":
        return GithubAuthProvider;
      default:
        throw new ApiError(404, SERVICE_ERROR_NOT_FOUND);
    }
  }
}

const factory = new SocialAuthProviderFactory();
export default factory;
