import {
  SECRET_PASSWORD,
  SERVICE_ERROR_INTERNAL,
  SERVICE_ERROR_NOT_FOUND,
  SERVICE_ERROR_UNAUTHORIZED,
} from "@/domain/constants";
import { CustomResponse } from "@/domain/types";
import { NextApiRequest, NextApiResponse } from "next";
import CookieUtil from "@/lib/cookie";
import { ApiError } from "next/dist/server/api-utils";
import SocialAuthProviderFactory from "@/domain/social-auth-provider-factory";
import { SocialAuthProvider } from "@/domain/social-auth-provider";

import TokenUtil from "@/lib/token";
import UserRepository from "@/repositories/user-repository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomResponse<undefined>>
) {
  if (req.method !== "GET") {
    res.status(404).json({
      error: SERVICE_ERROR_NOT_FOUND,
    });
    return;
  }
  const { provider, code, state } = req.query;

  const csrfState = CookieUtil.get("csrf_state", req, res);
  if (state !== csrfState) {
    res.status(401).json({
      error: SERVICE_ERROR_UNAUTHORIZED,
    });
    return;
  }
  try {
    const socialAuthProvider: SocialAuthProvider =
      SocialAuthProviderFactory.get(provider as string);

    const socialInfo = await socialAuthProvider.getSocialInfoByCode(
      code as string
    );

    const userExists = await UserRepository.doesUserEmailExist(
      socialInfo.email
    );

    let page = "/profile";
    if (!userExists) {
      page = "/profile/edit";
      await UserRepository.createUser({
        bio: "",
        name: socialInfo.name ?? "",
        phone: "",
        photo: socialInfo.picture ?? "",
        email: socialInfo.email,
        password: SECRET_PASSWORD,
      });
    }

    const user = await UserRepository.getUserByEmail(socialInfo.email);
    const token = TokenUtil.createToken(user.id);

    const cookie = CookieUtil.serialize("access_token", token);

    res.setHeader("Set-Cookie", cookie);
    res.redirect(page);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(404).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        error: SERVICE_ERROR_INTERNAL,
      });
    }
  }
}
