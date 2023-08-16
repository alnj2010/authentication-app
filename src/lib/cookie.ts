import { serialize } from "cookie";
import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";

class CookieUtil {
  constructor() {}

  serializeAccessToken(token: string) {
    return serialize("access_token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
    });
  }
  getAccessToken(req: NextApiRequest, res: NextApiResponse): string {
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("access_token");
    if (!accessToken) {
      throw Error("access token not found");
    }

    return accessToken;
  }

  removeAccessToken(): string {
    return serialize("access_token", "deleted", {
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
