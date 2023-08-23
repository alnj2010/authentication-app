import {
  CustomResponse,
  FileUploadeable,
  UserServer,
  UserUpdateable,
  ValidationScheme,
} from "@/domain/types";
import { NextApiRequest, NextApiResponse } from "next";
import TokenUtil from "@/lib/token";
import CookieUtil from "@/lib/cookie";
import S3Uploader from "@/lib/uploader";
import FormDataUtil from "@/lib/form-data";
import { FormValidationError } from "@/domain/errors/form-validation-error";
import { ApiError } from "next/dist/server/api-utils";
import { SERVICE_ERROR_INTERNAL } from "@/domain/constants";
import {
  min4CharsValidator,
  nonEmptyValidator,
  phoneNumberValidator,
  photoNameExtensionValidator,
  photoSizeValidator,
  validateScheme,
} from "@/lib/validator";
import UserRepository from "@/repositories/user-repository";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomResponse<any>>
) {
  if (req.method === "PUT") {
    try {
      const token = CookieUtil.get("access_token", req, res);
      const id = TokenUtil.verifyTokenAndGetSub(token);
      const userDto: UserServer = await FormDataUtil.getUserAndPhotoByRequest(
        req
      );

      const userDtoScheme: ValidationScheme = {
        photo: {
          value: userDto.photo,
          validators: [photoNameExtensionValidator, photoSizeValidator],
        },
        phone: {
          value: userDto.phone,
          validators: [phoneNumberValidator],
        },
        password: {
          value: userDto.password,
          validators: [nonEmptyValidator, min4CharsValidator],
        },
      };

      validateScheme(userDtoScheme);

      const url = userDto.photo
        ? await S3Uploader.upload(userDto.photo as FileUploadeable)
        : null;

      const userUpdateable: UserUpdateable = {
        id: id,
        name: userDto.name,
        bio: userDto.bio,
        phone: userDto.phone,
        password: userDto.password,
        photo: url,
      };

      await UserRepository.updateUser(userUpdateable);

      res.status(200).json({ code: 200, data: "Successfully update" });
    } catch (error) {
      if (error instanceof FormValidationError)
        res.status(400).json({
          code: 400,
          error: error.errorMsgs.join(" "),
          data: null,
        });
      else if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          code: error.statusCode,
          error: error.message,
          data: null,
        });
      } else
        res.status(500).json({
          code: 500,
          error: SERVICE_ERROR_INTERNAL,
          data: null,
        });
    }
  }
}
