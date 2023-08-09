import { AuthInfo } from "@/domain/types";
import { Api } from "@/lib/api";

export async function loginService(user: AuthInfo) {
  return await Api.post("/api/login", user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
