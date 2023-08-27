import { UserSubmit } from "@/domain/types";
import { Api } from "@/lib/api";

export async function updateUserService(user: UserSubmit): Promise<void> {
  const formData = new FormData();

  for (const key in user) {
    formData.append(key, user[key as keyof UserSubmit] as string | Blob);
  }

  return Api.put("/api/user", formData);
}
