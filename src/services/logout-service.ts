import { Api } from "@/lib/api";

export async function logoutService(): Promise<void> {
  return Api.post("/api/logout");
}
