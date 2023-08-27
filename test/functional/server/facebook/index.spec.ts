import { createMocks } from "node-mocks-http";
import handler from "@/pages/api/login/[provider]";
import { CustomResponse } from "@/domain/types";
import { FACEBOOK_AUTH_URL, SERVICE_ERROR_NOT_FOUND } from "@/domain/constants";

import QueryStringUtil from "@/lib/query-string";

jest.mock("@/lib/env", () => {
  return {
    get: jest.fn().mockImplementation((key) => key),
  };
});

jest.mock("@/lib/crypto", () => {
  return {
    generateRandomCode: jest.fn().mockReturnValue("csrfstatedummy"),
  };
});

describe("endpoint GET api/login/facebook", () => {
  beforeEach(() => {});

  it("Should return code 404 when method is diferent to GET", async () => {
    const { req, res } = createMocks({
      method: "POST",
      query: {
        provider: "facebook",
      },
    });

    // @ts-ignore
    await handler(req, res);

    const data: CustomResponse<undefined> = res._getJSONData();
    expect(res.statusCode).toBe(404);
    expect(data.error).toBe(SERVICE_ERROR_NOT_FOUND);
  });

  it("Should redirect to facebook authorization server", async () => {
    jest.spyOn(QueryStringUtil, "stringify");

    const { req, res } = createMocks({
      method: "GET",
      query: {
        provider: "facebook",
      },
    });

    // @ts-ignore
    await handler(req, res);

    const redirectUrl = res._getRedirectUrl();

    expect(res.statusCode).toBe(302);
    expect(redirectUrl).toContain(FACEBOOK_AUTH_URL);
    expect(QueryStringUtil.stringify).toHaveBeenCalledWith({
      response_type: "code",
      client_id: "FACEBOOK_CLIENT_ID",
      scope: "openid email",
      redirect_uri: "FACEBOOK_REDIRECT_CODE_URL",
      state: "csrfstatedummy",
    });
  });
});
