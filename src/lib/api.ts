import { CustomApiError } from "@/domain/errors/custom-api-error";
import { ApiResponse } from "@/domain/types";

export const Api = new (class {
  private async request<T>(
    url: string,
    config?: RequestInit
  ): Promise<ApiResponse<T>> {
    const response: Response = await fetch(url, config);

    try {
      const data = await response.json();
      return {
        ok: response.ok,
        data,
      };
    } catch (error) {
      throw new CustomApiError(response.statusText);
    }
  }

  async get<T>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>(url);
  }

  async post<TBody, T>(url: string, body: TBody): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
})();
