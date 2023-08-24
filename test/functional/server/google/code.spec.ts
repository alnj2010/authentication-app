import { createMocks } from "node-mocks-http";
import handler from "@/pages/api/login/google/code";
import { CustomResponse } from "@/domain/types";
import { GOOGLE_AUTH_URL, SERVICE_ERROR_NOT_FOUND } from "@/domain/constants";
import UserRepository from "@/repositories/user-repository";
import TokenUtil from "@/lib/token";
import GoogleAuthUtil from "@/lib/google-auth";
import { userDummy } from "../../../dummies";

jest.mock("@/repositories/user-repository.ts", () => {
  return {
    createUser: jest.fn(),
    doesUserEmailExist: jest.fn().mockResolvedValue(true),
    getUserByEmail: jest.fn(),
  };
});

jest.mock("@/lib/google-auth", () => {
  return {
    exchangeCodeForToken: jest.fn().mockResolvedValue("token"),
  };
});

jest.mock("@/lib/token", () => {
  return {
    createToken: jest.fn().mockResolvedValue("token"),
    decode: jest.fn().mockReturnValue({
      email: "a@email.com",
      name: "name",
      picture: "picture",
    }),
  };
});

describe("endpoint GET api/login/google", () => {
  beforeEach(() => {
    (UserRepository.createUser as jest.Mock).mockClear();
    (UserRepository.doesUserEmailExist as jest.Mock).mockClear();
    (UserRepository.getUserByEmail as jest.Mock).mockClear();

    (GoogleAuthUtil.exchangeCodeForToken as jest.Mock).mockClear();

    (TokenUtil.createToken as jest.Mock).mockClear();
    (TokenUtil.decode as jest.Mock).mockClear();
  });

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

  it("When user not exist in DB should add it and go to edit profile page", async () => {
    jest.spyOn(UserRepository, "doesUserEmailExist").mockResolvedValue(false);
    jest.spyOn(UserRepository, "getUserByEmail").mockResolvedValue(userDummy);
    jest.spyOn(UserRepository, "createUser");

    const { req, res } = createMocks({
      method: "GET",
      query: {
        code: "code",
      },
    });

    // @ts-ignore
    await handler(req, res);

    const redirectUrl = res._getRedirectUrl();

    expect(GoogleAuthUtil.exchangeCodeForToken).toBeCalledTimes(1);
    expect(UserRepository.createUser).toBeCalledTimes(1);
    expect(res.statusCode).toBe(302);
    expect(redirectUrl).toBe("/profile/edit");
  });

  it("When user exist in DB should go to profile page", async () => {
    jest.spyOn(UserRepository, "doesUserEmailExist").mockResolvedValue(true);
    jest.spyOn(UserRepository, "getUserByEmail").mockResolvedValue(userDummy);
    jest.spyOn(UserRepository, "createUser");

    const { req, res } = createMocks({
      method: "GET",
      query: {
        code: "code",
      },
    });

    // @ts-ignore
    await handler(req, res);

    const redirectUrl = res._getRedirectUrl();

    expect(GoogleAuthUtil.exchangeCodeForToken).toBeCalledTimes(1);
    expect(UserRepository.createUser).toBeCalledTimes(0);
    expect(res.statusCode).toBe(302);
    expect(redirectUrl).toBe("/profile");
  });
});