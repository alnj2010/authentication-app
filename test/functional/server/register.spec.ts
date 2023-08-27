import { createMocks } from "node-mocks-http";
import handler from "@/pages/api/register";
import { userDummy } from "../../dummies";
import UserRepository from "@/repositories/user-repository";
import { invalidFieldMsg, lessThan4CharsFieldMsg } from "@/lib/validator";
import {
  REGISTER_SERVICE_ERROR_EXISTING_USER,
  SERVICE_ERROR_NOT_FOUND,
} from "@/domain/constants";
import { CustomResponse } from "@/domain/types";

jest.mock("@/repositories/user-repository.ts", () => {
  return {
    getUserByEmail: jest.fn(),
    doesUserEmailExist: jest.fn().mockRejectedValue(false),
    createUserByCredentials: jest.fn(),
    getUserById: jest.fn(),
  };
});

describe("endpoint POST /register", () => {
  beforeEach(() => {
    (UserRepository.getUserByEmail as jest.Mock).mockReset();
    (UserRepository.doesUserEmailExist as jest.Mock).mockReset();
    (UserRepository.createUserByCredentials as jest.Mock).mockReset();
    (UserRepository.getUserById as jest.Mock).mockReset();
  });

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

  it("Should return code 400 when invalid email or password is submitted", async () => {
    jest.spyOn(UserRepository, "getUserByEmail").mockResolvedValue(userDummy);

    const body = { email: "emailinvalid", password: "*" };
    const { req, res } = createMocks({
      method: "POST",
      body,
    });

    // @ts-ignore
    await handler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().error).toContain(invalidFieldMsg("email"));
    expect(res._getJSONData().error).toContain(
      lessThan4CharsFieldMsg("password")
    );
  });

  it("Should return code 400 when email already exist in DB", async () => {
    jest.spyOn(UserRepository, "doesUserEmailExist").mockResolvedValue(true);

    const body = { email: userDummy.email, password: userDummy.password };
    const { req, res } = createMocks({
      method: "POST",
      body,
    });

    // @ts-ignore
    await handler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().error).toContain(
      REGISTER_SERVICE_ERROR_EXISTING_USER
    );
  });

  it("Should return code 500 when DB is fail", async () => {
    jest
      .spyOn(UserRepository, "doesUserEmailExist")
      .mockRejectedValue(new Error("error"));

    const body = { email: userDummy.email, password: userDummy.password };
    const { req, res } = createMocks({
      method: "POST",
      body,
    });

    // @ts-ignore
    await handler(req, res);
    expect(res.statusCode).toBe(500);
  });

  it("Should return code 200 when email and password are submited sucessfully", async () => {
    jest.spyOn(UserRepository, "getUserByEmail").mockResolvedValue(userDummy);

    const body = { email: userDummy.email, password: userDummy.password };
    const { req, res } = createMocks({
      method: "POST",
      body,
    });

    // @ts-ignore
    await handler(req, res);

    expect(UserRepository.createUserByCredentials).toHaveBeenCalledWith(body);
    expect(res.getHeader("Set-Cookie")).toBeDefined();
    expect(res.statusCode).toBe(200);
  });
});
