import { createMocks } from "node-mocks-http";
import handler from "@/pages/api/login/[provider]";
import { CustomResponse } from "@/domain/types";
import { TWITTER_AUTH_URL, SERVICE_ERROR_NOT_FOUND } from "@/domain/constants";

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

describe("endpoint GET api/login/twitter", () => {
  beforeEach(() => {});

  it("Should return code 404 when method is diferent to GET", async () => {
    const { req, res } = createMocks({
      method: "POST",
      query: {
        provider: "twitter",
      },
    });

    // @ts-ignore
    await handler(req, res);

    const data: CustomResponse<null> = res.json()._getJSONData();
    expect(res.statusCode).toBe(404);
    expect(data.error).toBe(SERVICE_ERROR_NOT_FOUND);
  });

  it("Should redirect to twitter authorization server", async () => {
    jest.spyOn(QueryStringUtil, "stringify");

    const { req, res } = createMocks({
      method: "GET",
      query: {
        provider: "twitter",
      },
    });

    // @ts-ignore
    await handler(req, res);

    const redirectUrl = res._getRedirectUrl();

    expect(res.statusCode).toBe(302);
    expect(redirectUrl).toContain(TWITTER_AUTH_URL);
    expect(QueryStringUtil.stringify).toHaveBeenCalledWith({
      code_challenge: "challenge",
      code_challenge_method: "plain",
      response_type: "code",
      client_id: "TWITTER_CLIENT_ID",
      scope: "users.read tweet.read",
      redirect_uri: "TWITTER_REDIRECT_CODE_URL",
      state: "csrfstatedummy",
    });
  });
});
