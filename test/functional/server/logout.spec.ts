import { createMocks } from "node-mocks-http";
import handler from "@/pages/api/logout";
import { CustomResponse } from "@/domain/types";
import { SERVICE_ERROR_NOT_FOUND } from "@/domain/constants";

describe("endpoint POST /logout", () => {
  beforeEach(() => {});

  it("Should return code 404 when method is diferent to POST", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    // @ts-ignore
    await handler(req, res);

    const data: CustomResponse<undefined> = res._getJSONData();
    expect(res.statusCode).toBe(404);
    expect(data.error).toBe(SERVICE_ERROR_NOT_FOUND);
  });

  it("Should return code 200 when logout is success", async () => {
    const { req, res } = createMocks({
      method: "POST",
    });

    // @ts-ignore
    await handler(req, res);

    expect(res.getHeader("Set-Cookie")).toBeDefined();
    expect(res.statusCode).toBe(200);
  });
});
