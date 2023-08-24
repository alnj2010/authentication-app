import { createMocks } from "node-mocks-http";
import handler from "@/pages/api/login/google";
import { CustomResponse } from "@/domain/types";
import { GOOGLE_AUTH_URL, SERVICE_ERROR_NOT_FOUND } from "@/domain/constants";
import QueryStringUtil from "@/lib/query-string";

jest.mock("@/lib/env", () => {
  return {
    get: jest.fn().mockImplementation((key) => key),
  };
});

describe("endpoint GET api/login/google", () => {
  beforeEach(() => {});

  it("Should return code 404 when method is diferent to GET", async () => {
    const { req, res } = createMocks({
      method: "POST",
    });

    // @ts-ignore
    await handler(req, res);

    const data: CustomResponse<null> = res.json()._getJSONData();
    expect(res.statusCode).toBe(404);
    expect(data.error).toBe(SERVICE_ERROR_NOT_FOUND);
  });

  it("Should redirect to google authorization server", async () => {
    jest.spyOn(QueryStringUtil, "stringify");

    const { req, res } = createMocks({
      method: "GET",
    });

    // @ts-ignore
    await handler(req, res);

    const redirectUrl = res._getRedirectUrl();

    expect(res.statusCode).toBe(302);
    expect(redirectUrl).toContain(GOOGLE_AUTH_URL);
    expect(QueryStringUtil.stringify).toHaveBeenCalledWith({
      response_type: "code",
      client_id: "GOOGLE_CLIENT_ID",
      scope: "openid email profile",
      redirect_uri: "GOOGLE_REDIRECT_CODE_URL",
    });
  });
});
