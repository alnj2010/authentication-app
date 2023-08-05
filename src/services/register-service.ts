import { AuthError } from "@/domain/errors/auth-error";
import { AuthInfo, CustomResponse } from "@/domain/types";
import { Api } from "@/lib/api";

export async function register(user: AuthInfo) {
  try {
    const response = await Api.post<AuthInfo, CustomResponse<any>>(
      "/api/register",
      user
    );
    if (response.ok) {
      return response.data;
    } else {
      throw new AuthError(response.data.error ?? "register api error");
    }
  } catch (error) {
    throw error;
  }
}
