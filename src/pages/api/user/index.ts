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
import {
  SERVICE_ERROR_INTERNAL,
  SERVICE_ERROR_NOT_FOUND,
} from "@/domain/constants";
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
  res: NextApiResponse<CustomResponse<string | undefined>>
) {
  if (req.method !== "PUT") {
    res.status(404).json({
      error: SERVICE_ERROR_NOT_FOUND,
    });
    return;
  }
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

    res.status(200).json({ data: "Successfully update" });
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
