import { AuthError } from "@/domain/errors/auth-error";
import { AuthInfo, CustomResponse, SocialProviders } from "@/domain/types";
import { Api } from "@/lib/api";

export async function socialAuth(provider: SocialProviders) {
  try {
    const response = await Api.post<AuthInfo, CustomResponse<any>>(
      `/api/auth-${provider}`
    );
    if (response.ok) {
      return response.data;
    } else {
      throw new AuthError(response.data.error ?? "auth api error");
    }
  } catch (error) {
    throw error;
  }
}
