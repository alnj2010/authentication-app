import { SECRET_PASSWORD, SERVICE_ERROR_NOT_FOUND } from "@/domain/constants";
import { CustomResponse } from "@/domain/types";
import { NextApiRequest, NextApiResponse } from "next";
import TokenUtil from "@/lib/token";
import CookieUtil from "@/lib/cookie";
import UserRepository from "@/repositories/user-repository";

import queryString from "query-string";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomResponse<any>>
) {
  if (req.method !== "GET") {
    res.status(404).json({
      code: 404,
      error: SERVICE_ERROR_NOT_FOUND,
      data: null,
    });
    return;
  }

  const { code } = req.query;

  const body = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    grant_type: "authorization_code",
    redirect_uri: process.env.GOOGLE_REDIRECT_CODE_URL,
  };

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: queryString.stringify(body),
  });

  const data = await response.json();
  const idToken = data.id_token;
  const payload = TokenUtil.decode(idToken);
  const userExists = await UserRepository.doesUserEmailExist(payload.email);

  if (!userExists) {
    await UserRepository.createUser({
      bio: "",
      name: payload.name ?? "",
      phone: "",
      photo: payload.picture ?? "",
      email: payload.email,
      password: SECRET_PASSWORD,
    });
  }

  const user = await UserRepository.getUserByEmail(payload.email);
  const token = TokenUtil.createToken(user.id);

  const cookie = CookieUtil.serialize("access_token", token);

  res.setHeader("Set-Cookie", cookie);
  res.redirect("/profile/edit");
}
