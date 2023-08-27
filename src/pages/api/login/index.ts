import {
  SERVICE_ERROR_INTERNAL,
  SERVICE_ERROR_INVALID_CREDENTIALS,
  SERVICE_ERROR_NOT_FOUND,
} from "@/domain/constants";
import { CustomResponse } from "@/domain/types";
import { NextApiRequest, NextApiResponse } from "next";
import HeaderUtil from "@/lib/header";
import { ApiError } from "next/dist/server/api-utils";
import UserRepository from "@/repositories/user-repository";
import CryptoUtil from "@/lib/crypto";
import TokenUtil from "@/lib/token";
import CookieUtil from "@/lib/cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomResponse<undefined | string>>
) {
  if (req.method !== "POST") {
    res.status(404).json({
      error: SERVICE_ERROR_NOT_FOUND,
    });
    return;
  }

  try {
    const credentials = HeaderUtil.getCredentialsByAuthBasicHeader(
      req.headers.authorization
    );
    const userExists = await UserRepository.doesUserEmailExist(
      credentials.email
    );
    if (!userExists) {
      throw new ApiError(401, SERVICE_ERROR_INVALID_CREDENTIALS);
    }

    const user = await UserRepository.getUserByEmail(credentials.email);

    if (CryptoUtil.hashPassword(credentials.password) !== user.password) {
      throw new ApiError(401, SERVICE_ERROR_INVALID_CREDENTIALS);
    }
    const token = TokenUtil.createToken(user.id);

    const cookie = CookieUtil.serialize("access_token", token);

    res.setHeader("Set-Cookie", cookie);
    res.status(200).json({ data: "Successfully Login" });
  } catch (error) {
    if (error instanceof ApiError)
      res.status(error.statusCode).json({
        error: error.message,
      });
    else
      res.status(500).json({
        error: SERVICE_ERROR_INTERNAL,
      });
  }
}
