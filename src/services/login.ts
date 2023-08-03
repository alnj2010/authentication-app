import { LoginError } from "@/domain/errors/login-error";
import { AuthInfo, CustomResponse } from "@/domain/types";
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
      throw new LoginError(response.data.error ?? "login api error");
    }
  } catch (error) {
    throw error;
  }
}
