import { createMocks } from "node-mocks-http";
import handler from "@/pages/api/user";
import { userDummy } from "../../dummies";
import { UserSubmit } from "@/domain/types";
import CookieUtil from "@/lib/cookie";
import TokenUtil from "@/lib/token";

import FormDataUtil from "@/lib/form-data";
import { ApiError } from "next/dist/server/api-utils";
import { SERVICE_ERROR_UNAUTHORIZED } from "@/domain/constants";
import S3Uploader from "@/lib/uploader";
import UserRepository from "@/repositories/user-repository";

jest.mock("@/repositories/user-repository.ts", () => {
  return {
    getUserByEmail: jest.fn(),
    doesUserEmailExist: jest.fn().mockRejectedValue(false),
    createUserByCredentials: jest.fn(),
    updateUser: jest.fn(),
    getUserById: jest.fn(),
  };
});

const invalidUserPhotoDummy = new File(
  [JSON.stringify({ ping: true })],
  "ping.json",
  {
    type: "image/*",
  }
);

const userPhotoDummy = new File([new Blob()], "photo.png", {
  type: "image/*",
});

jest.mock("@/lib/form-data", () => {
  return {
    getUserAndPhotoByRequest: jest.fn(),
  };
});

jest.mock("@/lib/uploader", () => {
  return {
    upload: jest.fn().mockResolvedValue("urldummy"),
  };
});

jest.mock("@/lib/token", () => {
  return {
    createToken: jest.fn(),
    verifyTokenAndGetSub: jest.fn().mockReturnValue("1"),
  };
});

describe("endpoint PUT /update", () => {
  beforeEach(() => {
    (TokenUtil.createToken as jest.Mock).mockReset();
    (TokenUtil.verifyTokenAndGetSub as jest.Mock).mockReset();

    (FormDataUtil.getUserAndPhotoByRequest as jest.Mock).mockReset();

    (S3Uploader.upload as jest.Mock).mockReset();

    (UserRepository.updateUser as jest.Mock).mockReset();
  });

  it("Should return code 401 when access_token cookie not found", async () => {
    const { req, res } = createMocks({
      method: "PUT",
    });

    // @ts-ignore
    await handler(req, res);
    expect(res.statusCode).toBe(401);
  });

  it("Should return code 401 when access_token is not valid", async () => {
    jest.spyOn(TokenUtil, "verifyTokenAndGetSub").mockImplementation(() => {
      throw new ApiError(401, SERVICE_ERROR_UNAUTHORIZED);
    });

    const body = new FormData();
    const userSubmit: UserSubmit = { ...userDummy, photo: userPhotoDummy };
    for (const key in userSubmit) {
      body.append(key, userSubmit[key as keyof UserSubmit] as string | Blob);
    }
    const cookie = CookieUtil.serialize("access_token", "tokendummy");

    const { req, res } = createMocks({
      method: "PUT",
      headers: {
        cookie: cookie,
      },
      body,
    });

    // @ts-ignore
    await handler(req, res);
    expect(res.statusCode).toBe(401);
  });

  it("Should return code 400 when the formdata is invalid", async () => {
    jest
      .spyOn(FormDataUtil, "getUserAndPhotoByRequest")
      .mockImplementation(() => {
        throw new ApiError(400, "");
      });

    const body = new FormData();
    const cookie = CookieUtil.serialize("access_token", "tokendummy");

    const { req, res } = createMocks({
      method: "PUT",
      headers: {
        cookie: cookie,
      },
      body,
    });

    // @ts-ignore
    await handler(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("Should return code 400 when user password is invalid", async () => {
    jest
      .spyOn(FormDataUtil, "getUserAndPhotoByRequest")
      .mockResolvedValue({ ...userDummy, photo: null, password: "*" });

    const body = new FormData();
    const cookie = CookieUtil.serialize("access_token", "tokendummy");

    const { req, res } = createMocks({
      method: "PUT",
      headers: {
        cookie: cookie,
      },
      body,
    });

    // @ts-ignore
    await handler(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("Should return code 400 when user phone invalid", async () => {
    jest
      .spyOn(FormDataUtil, "getUserAndPhotoByRequest")
      .mockResolvedValue({ ...userDummy, photo: null, phone: "invalidphone" });

    const body = new FormData();
    const cookie = CookieUtil.serialize("access_token", "tokendummy");

    const { req, res } = createMocks({
      method: "PUT",
      headers: {
        cookie: cookie,
      },
      body,
    });

    // @ts-ignore
    await handler(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("Should return code 400 when user photo invalid", async () => {
    jest
      .spyOn(FormDataUtil, "getUserAndPhotoByRequest")
      .mockResolvedValue({ ...userDummy, photo: invalidUserPhotoDummy });

    const body = new FormData();
    const cookie = CookieUtil.serialize("access_token", "tokendummy");

    const { req, res } = createMocks({
      method: "PUT",
      headers: {
        cookie: cookie,
      },
      body,
    });

    // @ts-ignore
    await handler(req, res);
    expect(res.statusCode).toBe(400);
  });

  it("Should return code 500 when upload service fail", async () => {
    jest
      .spyOn(FormDataUtil, "getUserAndPhotoByRequest")
      .mockResolvedValue({ ...userDummy, photo: userPhotoDummy });

    jest.spyOn(S3Uploader, "upload").mockRejectedValue(new Error());

    const body = new FormData();
    const cookie = CookieUtil.serialize("access_token", "tokendummy");

    const { req, res } = createMocks({
      method: "PUT",
      headers: {
        cookie: cookie,
      },
      body,
    });

    // @ts-ignore
    await handler(req, res);
    expect(res.statusCode).toBe(500);
  });

  it("Should return code 500 when updateUser service fail", async () => {
    jest
      .spyOn(FormDataUtil, "getUserAndPhotoByRequest")
      .mockResolvedValue({ ...userDummy, photo: userPhotoDummy });

    jest.spyOn(UserRepository, "updateUser").mockRejectedValue(new Error());

    const body = new FormData();
    const cookie = CookieUtil.serialize("access_token", "tokendummy");

    const { req, res } = createMocks({
      method: "PUT",
      headers: {
        cookie: cookie,
      },
      body,
    });

    // @ts-ignore
    await handler(req, res);
    expect(res.statusCode).toBe(500);
  });

  it("Should return code 200 when the user is upload sucessfully", async () => {
    jest
      .spyOn(FormDataUtil, "getUserAndPhotoByRequest")
      .mockResolvedValue({ ...userDummy, photo: userPhotoDummy });

    const cookie = CookieUtil.serialize("access_token", "tokendummy");

    const body = new FormData();
    const { req, res } = createMocks({
      method: "PUT",
      headers: {
        cookie: cookie,
      },
      body,
    });

    // @ts-ignore
    await handler(req, res);

    expect(res.statusCode).toBe(200);

    expect(UserRepository.updateUser).toBeCalledTimes(1);
    expect(S3Uploader.upload).toBeCalledTimes(1);
    expect(TokenUtil.verifyTokenAndGetSub).toBeCalledTimes(1);
    expect(FormDataUtil.getUserAndPhotoByRequest).toBeCalledTimes(1);
  });
});
