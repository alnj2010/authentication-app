import { AuthInfo } from "@/domain/types";
import { Api } from "@/lib/api";

export async function registerService(user: AuthInfo) {
  return await Api.post("/api/register", user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
