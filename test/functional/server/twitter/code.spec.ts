import { createMocks } from "node-mocks-http";
import handler from "@/pages/api/login/[provider]/code";
import { CustomResponse } from "@/domain/types";
import {
  SERVICE_ERROR_NOT_FOUND,
  SERVICE_ERROR_UNAUTHORIZED,
} from "@/domain/constants";
import UserRepository from "@/repositories/user-repository";
import TokenUtil from "@/lib/token";
import TwitterAuthProvider from "@/domain/twitter-auth-provider";

import { userDummy } from "../../../dummies";
import CookieUtil from "@/lib/cookie";

jest.mock("@/repositories/user-repository.ts", () => {
  return {
    createUser: jest.fn(),
    doesUserEmailExist: jest.fn().mockResolvedValue(true),
    getUserByEmail: jest.fn(),
  };
});

jest.mock("@/lib/token", () => {
  return {
    createToken: jest.fn().mockResolvedValue("token"),
  };
});

jest.mock("@/lib/api", () => ({
  Api: {
    post: jest.fn().mockResolvedValue({ access_token: "idtoken" }),
    get: jest.fn().mockResolvedValue({
      data: {
        username: "username",
        name: "name",
        profile_image_url: "picture",
      },
    }),
  },
}));

describe("endpoint GET api/login/twitter", () => {
  beforeEach(() => {
    (UserRepository.createUser as jest.Mock).mockClear();
    (UserRepository.doesUserEmailExist as jest.Mock).mockClear();
    (UserRepository.getUserByEmail as jest.Mock).mockClear();

    (TokenUtil.createToken as jest.Mock).mockClear();

    jest.spyOn(TwitterAuthProvider, "getSocialInfoByCode");
    (TwitterAuthProvider.getSocialInfoByCode as jest.Mock).mockClear();
  });

  it("Should return code 404 when method is diferent to GET", async () => {
    const { req, res } = createMocks({
      method: "POST",
    });

    // @ts-ignore
    await handler(req, res);

    const data: CustomResponse<undefined> = res._getJSONData();
    expect(res.statusCode).toBe(404);
    expect(data.error).toBe(SERVICE_ERROR_NOT_FOUND);
  });

  it("Should return code 401 when csrf verification failed", async () => {
    const cookie = CookieUtil.serialize("csrf_state", "csrfstatedummy2");

    const { req, res } = createMocks({
      method: "GET",
      query: {
        code: "code",
        state: "csrfstatedummy",
      },
      headers: {
        cookie: cookie,
      },
    });

    // @ts-ignore
    await handler(req, res);

    const data: CustomResponse<undefined> = res._getJSONData();
    expect(res.statusCode).toBe(401);
    expect(data.error).toBe(SERVICE_ERROR_UNAUTHORIZED);
  });

  it("When user not exist in DB should add it and go to edit profile page", async () => {
    jest.spyOn(UserRepository, "doesUserEmailExist").mockResolvedValue(false);
    jest.spyOn(UserRepository, "getUserByEmail").mockResolvedValue(userDummy);
    jest.spyOn(UserRepository, "createUser");
    const cookie = CookieUtil.serialize("csrf_state", "csrfstatedummy");

    const { req, res } = createMocks({
      method: "GET",
      query: {
        code: "code",
        state: "csrfstatedummy",
        provider: "twitter",
      },
      headers: {
        cookie: cookie,
      },
    });

    // @ts-ignore
    await handler(req, res);

    const redirectUrl = res._getRedirectUrl();

    expect(TwitterAuthProvider.getSocialInfoByCode).toBeCalledTimes(1);
    expect(UserRepository.createUser).toBeCalledTimes(1);
    expect(res.statusCode).toBe(302);
    expect(redirectUrl).toBe("/profile/edit");
  });

  it("When user exist in DB should go to profile page", async () => {
    jest.spyOn(UserRepository, "doesUserEmailExist").mockResolvedValue(true);
    jest.spyOn(UserRepository, "getUserByEmail").mockResolvedValue(userDummy);
    jest.spyOn(UserRepository, "createUser");
    const cookie = CookieUtil.serialize("csrf_state", "csrfstatedummy");

    const { req, res } = createMocks({
      method: "GET",
      query: {
        code: "code",
        state: "csrfstatedummy",
        provider: "twitter",
      },
      headers: {
        cookie: cookie,
      },
    });

    // @ts-ignore
    await handler(req, res);

    const redirectUrl = res._getRedirectUrl();

    expect(TwitterAuthProvider.getSocialInfoByCode).toBeCalledTimes(1);
    expect(UserRepository.createUser).toBeCalledTimes(0);
    expect(res.statusCode).toBe(302);
    expect(redirectUrl).toBe("/profile");
  });
});
