import { ApiError } from "@/domain/errors/api-error";
import { InternalONotFoundApiError } from "@/domain/errors/internal-or-not-found-api-error";
import { CustomResponse } from "@/domain/types";

export const Api = new (class {
  private async request(url: string, config?: RequestInit): Promise<any> {
    const response: Response = await fetch(url, config);
    try {
      const payload: CustomResponse<any> = await response.json();
      if (response.ok) {
        return payload.data;
      } else {
        throw new ApiError(payload.error);
      }
    } catch (error) {
      if (error instanceof ApiError) throw error;
      else throw new InternalONotFoundApiError(response.statusText);
    }
  }

  async get(url: string, config?: RequestInit): Promise<any> {
    return this.request(url, config);
  }

  async post(
    url: string,
    body: Object | null,
    config?: RequestInit
  ): Promise<any> {
    return this.request(url, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    });
  }

  async put(url: string, body: FormData, config?: RequestInit): Promise<any> {
    return this.request(url, {
      method: "PUT",
      body,
      ...config,
    });
  }
})();
