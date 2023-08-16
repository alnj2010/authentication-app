import { Api } from "@/lib/api";

export async function logoutService() {
  return await Api.post("/api/logout", null);
}
