export interface SocialAuthProvider {
  generateAuthorizationServerUrl(csrfState: string): string;
  exchangeCodeForToken(code: string): Promise<string>;
}
