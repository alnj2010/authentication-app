import { AuthInfo } from "@/domain/types";
import { Api } from "@/lib/api";
import HeaderUtil from "@/lib/header";

export async function loginService(user: AuthInfo): Promise<void> {
  return Api.post("/api/login", {
    headers: {
      "Content-Type": "application/json",
      authorization: HeaderUtil.serializeAuthorizationHeader(
        "Basic",
        user.email,
        user.password
      ),
    },
  });
}
