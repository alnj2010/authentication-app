import { AuthError } from "@/domain/errors/auth-error";
import { AuthInfo, CustomResponse, SocialProviders } from "@/domain/types";
import { Api } from "@/lib/api";

export async function regularLogin(user: AuthInfo) {
  try {
    const response = await Api.post<AuthInfo, CustomResponse<any>>(
      "/api/login",
      user
    );
    if (response.ok) {
      return response.data;
    } else {
      throw new AuthError(response.data.error ?? "login api error");
    }
  } catch (error) {
    throw error;
  }
}
