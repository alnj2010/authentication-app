import {
  SERVICE_ERROR_INTERNAL,
  SERVICE_ERROR_INVALID_CREDENTIALS,
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
  res: NextApiResponse<CustomResponse<any>>
) {
  if (req.method === "POST") {
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

      const cookie = CookieUtil.serializeAccessToken(token);

      res.setHeader("Set-Cookie", cookie);
      res.status(200).json({ code: 200, data: "Successfully Login" });
    } catch (error) {
      if (error instanceof ApiError)
        res.status(error.statusCode).json({
          code: error.statusCode,
          error: error.message,
          data: null,
        });
      else
        res.status(500).json({
          code: 500,
          error: SERVICE_ERROR_INTERNAL,
          data: null,
        });
    }
  }
}
