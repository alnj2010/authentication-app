import { SocialProviders } from "@/domain/types";
import { Api } from "@/lib/api";

export async function socialAuthService(provider: SocialProviders) {
  return Api.post(`/api/auth-${provider}`, null, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
