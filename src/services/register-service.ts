import { AuthInfo } from "@/domain/types";
import { Api } from "@/lib/api";

export async function registerService(user: AuthInfo): Promise<void> {
  return Api.post("/api/register", user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
