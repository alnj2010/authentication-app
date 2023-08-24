import { SECRET_PASSWORD, SERVICE_ERROR_NOT_FOUND } from "@/domain/constants";
import { CustomResponse } from "@/domain/types";
import { NextApiRequest, NextApiResponse } from "next";
import TokenUtil from "@/lib/token";
import CookieUtil from "@/lib/cookie";
import UserRepository from "@/repositories/user-repository";

import GoogleAuthUtil from "@/lib/google-auth";

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

  const idToken = await GoogleAuthUtil.exchangeCodeForToken(code as string);

  const payload = TokenUtil.decode(idToken);

  const userExists = await UserRepository.doesUserEmailExist(payload.email);

  let page = "/profile";
  if (!userExists) {
    page = "/profile/edit";
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
  res.redirect(page);
}
