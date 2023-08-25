import {
  SECRET_PASSWORD,
  SERVICE_ERROR_NOT_FOUND,
  SERVICE_ERROR_UNAUTHORIZED,
} from "@/domain/constants";
import { CustomResponse } from "@/domain/types";
import { NextApiRequest, NextApiResponse } from "next";
import TokenUtil from "@/lib/token";
import CookieUtil from "@/lib/cookie";
import UserRepository from "@/repositories/user-repository";

import FacebookAuthUtil from "@/lib/facebook-auth";

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

  const { code, state } = req.query;
  const csrfState = CookieUtil.get("csrf_state", req, res);
  if (state !== csrfState) {
    res.status(401).json({
      code: 401,
      error: SERVICE_ERROR_UNAUTHORIZED,
      data: null,
    });
    return;
  }

  const idToken = await FacebookAuthUtil.exchangeCodeForToken(code as string);

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
