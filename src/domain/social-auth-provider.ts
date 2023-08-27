import { SocialInfo } from "./types";

export interface SocialAuthProvider {
  generateAuthorizationServerUrl(csrfState: string): string;
  getSocialInfoByCode(code: string): Promise<SocialInfo>;
}
