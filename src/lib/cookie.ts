import { SERVICE_ERROR_UNAUTHORIZED } from "@/domain/constants";
import { serialize } from "cookie";
import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";

class CookieUtil {
  constructor() {}

  serialize(name: string, token: string) {
    return serialize(name, token, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
  }
  get(name: string, req: NextApiRequest, res: NextApiResponse): string {
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get(name);
    if (!accessToken) {
      throw new ApiError(401, SERVICE_ERROR_UNAUTHORIZED);
    }

    return accessToken;
  }

  remove(name: string): string {
    return serialize(name, "deleted", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
      maxAge: 0,
    });
  }
}

const util = new CookieUtil();
export default util;
