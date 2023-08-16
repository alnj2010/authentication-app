import { createMocks } from "node-mocks-http";
import handler from "@/pages/api/login";
import { userDummy } from "../../dummies";
import UserRepository from "@/repositories/user-repository";
import Base64Util from "@/lib/base64";
import HeaderUtil from "@/lib/header";
import CryptoUtil from "@/lib/crypto";
import TokenUtil from "@/lib/token";

jest.mock("@/repositories/user-repository.ts", () => {
  return {
    getUserByEmail: jest.fn(),
    doesUserEmailExist: jest.fn().mockRejectedValue(false),
    createUserByCredentials: jest.fn(),
    getUserById: jest.fn(),
  };
});

jest.mock("@/lib/crypto.ts", () => {
  return {
    hashPassword: jest.fn().mockReturnValue(""),
  };
});

jest.mock("@/lib/token.ts", () => {
  return {
    createToken: jest.fn().mockReturnValue("token"),
    verifyTokenAndGetSub: jest.fn(),
  };
});

describe("endpoint POST /login", () => {
  beforeEach(() => {
    (UserRepository.getUserByEmail as jest.Mock).mockReset();
    (UserRepository.doesUserEmailExist as jest.Mock).mockReset();
    (UserRepository.createUserByCredentials as jest.Mock).mockReset();
    (UserRepository.getUserById as jest.Mock).mockReset();

    (CryptoUtil.hashPassword as jest.Mock).mockReset();

    (TokenUtil.createToken as jest.Mock).mockReset();
    (TokenUtil.verifyTokenAndGetSub as jest.Mock).mockReset();
  });

  it("Should return code 400 when the Authorization item is not in the header", async () => {
    const { req, res } = createMocks({
      method: "POST",
    });

    // @ts-ignore
    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it("Should return code 400 when the Authorization type item is different to Basic", async () => {
    const { req, res } = createMocks({
      method: "POST",
      headers: { authorization: "Bearer token" },
    });

    // @ts-ignore
    await handler(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("Should return code 400 when the Authorization item is different to base64 encode", async () => {
    const { req, res } = createMocks({
      method: "POST",
      headers: { authorization: "Basic token" },
    });

    // @ts-ignore
    await handler(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("Should return code 400 when email or password is empty", async () => {
    const { req, res } = createMocks({
      method: "POST",
      headers: { authorization: `Basic ${Base64Util.encode(":")}` },
    });

    // @ts-ignore
    await handler(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("Should return code 400 when email is not valid", async () => {
    const { req, res } = createMocks({
      method: "POST",
      headers: {
        authorization: HeaderUtil.serializeAuthBasicHeader({
          email: "invalidemail",
          password: userDummy.password,
        }),
      },
    });

    // @ts-ignore
    await handler(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("Should return code 400 when password is not valid", async () => {
    const { req, res } = createMocks({
      method: "POST",
      headers: {
        authorization: HeaderUtil.serializeAuthBasicHeader({
          email: userDummy.email,
          password: "*",
        }),
      },
    });

    // @ts-ignore
    await handler(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("Should return code 401 when email not found", async () => {
    jest.spyOn(UserRepository, "doesUserEmailExist").mockResolvedValue(false);

    const { req, res } = createMocks({
      method: "POST",
      headers: {
        authorization: HeaderUtil.serializeAuthBasicHeader(userDummy),
      },
    });

    // @ts-ignore
    await handler(req, res);
    expect(res.statusCode).toBe(401);
  });

  it("Should return code 401 when password not match", async () => {
    jest.spyOn(UserRepository, "doesUserEmailExist").mockResolvedValue(true);
    jest.spyOn(UserRepository, "getUserByEmail").mockResolvedValue(userDummy);

    const { req, res } = createMocks({
      method: "POST",
      headers: {
        authorization: HeaderUtil.serializeAuthBasicHeader(userDummy),
      },
    });

    // @ts-ignore
    await handler(req, res);
    expect(res.statusCode).toBe(401);
  });

  it("Should return code 200 when credentials is success", async () => {
    jest.spyOn(UserRepository, "doesUserEmailExist").mockResolvedValue(true);
    jest.spyOn(UserRepository, "getUserByEmail").mockResolvedValue(userDummy);
    jest.spyOn(CryptoUtil, "hashPassword").mockReturnValue(userDummy.password);

    const { req, res } = createMocks({
      method: "POST",
      headers: {
        authorization: HeaderUtil.serializeAuthBasicHeader(userDummy),
      },
    });

    // @ts-ignore
    await handler(req, res);

    expect(TokenUtil.createToken).toHaveBeenCalledWith(userDummy.id);
    expect(res.getHeader("Set-Cookie")).toBeDefined();
    expect(res.statusCode).toBe(200);
  });
});
