import {
  SERVICE_ERROR_INTERNAL,
  SERVICE_ERROR_NOT_FOUND,
} from "@/domain/constants";
import { CustomResponse } from "@/domain/types";
import { NextApiRequest, NextApiResponse } from "next";
import CookieUtil from "@/lib/cookie";
import CryptoUtil from "@/lib/crypto";
import { SocialAuthProvider } from "@/domain/social-auth-provider";
import SocialAuthProviderFactory from "@/domain/social-auth-provider-factory";
import { ApiError } from "next/dist/server/api-utils";

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
  const { provider } = req.query;

  try {
    const socialAuthProvider: SocialAuthProvider =
      SocialAuthProviderFactory.get(provider as string);

    const csrfState = CryptoUtil.generateRandomCode();
    const authUrl =
      socialAuthProvider.generateAuthorizationServerUrl(csrfState);

    const cookie = CookieUtil.serialize("csrf_state", csrfState);
    res.setHeader("Set-Cookie", cookie);

    res.redirect(302, authUrl);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        error: SERVICE_ERROR_INTERNAL,
      });
    }
  }
}
