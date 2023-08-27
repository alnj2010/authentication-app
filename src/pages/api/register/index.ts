import {
  REGISTER_SERVICE_ERROR_EXISTING_USER,
  SERVICE_ERROR_INTERNAL,
} from "@/domain/constants";
import { CustomResponse } from "@/domain/types";
import { NextApiRequest, NextApiResponse } from "next";
import UserRepository from "@/repositories/user-repository";
import TokenUtil from "@/lib/token";
import CookieUtil from "@/lib/cookie";
import {
  emailPatternValidator,
  min4CharsValidator,
  nonEmptyValidator,
  validateScheme,
} from "@/lib/validator";
import { FormValidationError } from "@/domain/errors/form-validation-error";
import { ApiError } from "next/dist/server/api-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomResponse<undefined | string>>
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const authInfoScheme = {
      email: {
        value: email,
        validators: [nonEmptyValidator, emailPatternValidator],
      },
      password: {
        value: password,
        validators: [nonEmptyValidator, min4CharsValidator],
      },
    };

    try {
      validateScheme(authInfoScheme);

      const userExists = await UserRepository.doesUserEmailExist(email);
      if (userExists) {
        res.status(400).json({
          error: REGISTER_SERVICE_ERROR_EXISTING_USER,
        });
      } else {
        await UserRepository.createUserByCredentials({ email, password });

        const user = await UserRepository.getUserByEmail(email);

        const token = TokenUtil.createToken(user.id);

        const cookie = CookieUtil.serialize("access_token", token);

        res.setHeader("Set-Cookie", cookie);
        res.status(200).json({ data: "Successfully Registration" });
      }
    } catch (error) {
      if (error instanceof FormValidationError)
        res.status(400).json({
          error: error.errorMsgs.join(" "),
        });
      else if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          error: error.message,
        });
      } else
        res.status(500).json({
          error: SERVICE_ERROR_INTERNAL,
        });
    }
  }
}
