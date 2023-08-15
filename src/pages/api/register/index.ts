import { REGISTER_SERVICE_ERROR_EXISTING_USER } from "@/domain/constants";
import { CustomResponse } from "@/domain/types";
import { NextApiRequest, NextApiResponse } from "next";
import UserRepository from "@/repositories/user-repository";
import TokenUtil from "@/lib/token";
import CookieUtil from "@/lib/cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomResponse<any>>
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const userExists = await UserRepository.doesUserEmailExist(email);
    if (userExists) {
      res.status(400).json({
        code: 400,
        error: REGISTER_SERVICE_ERROR_EXISTING_USER,
        data: null,
      });
    } else {
      await UserRepository.createUserByCredentials({ email, password });

      const user = await UserRepository.getUserByEmail(email);

      const token = TokenUtil.createToken(user.id);

      const cookie = CookieUtil.serializeAccessToken(token);

      res.setHeader("Set-Cookie", cookie);
      res.status(200).json({ code: 200, data: "Successfully Registration" });
    }
  }
}
