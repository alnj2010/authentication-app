import { AuthInfo } from "@/domain/types";
import { SERVICE_ERROR_INVALID_REQUEST } from "@/domain/constants";
import { ApiError } from "next/dist/server/api-utils";
import {
  authBasicValidator,
  emailPatternValidator,
  min4CharsValidator,
  nonEmptyValidator,
  validate,
} from "./validator";
import Base64Util from "@/lib/base64";

class HeaderUtil {
  constructor() {}

  getCredentialsByAuthBasicHeader(authorization = ""): AuthInfo {
    try {
      validate("Authorization Basic Header", authorization, [
        authBasicValidator,
      ]);

      const base64Credentials = authorization?.split(" ")[1] as string;
      const credentials = Base64Util.decode(base64Credentials);

      const [email, password] = credentials.split(":");
      validate("email", email, [nonEmptyValidator, emailPatternValidator]);
      validate("password", password, [nonEmptyValidator, min4CharsValidator]);

      return {
        email,
        password,
      };
    } catch (error) {
      throw new ApiError(400, SERVICE_ERROR_INVALID_REQUEST);
    }
  }

  serializeAuthorizationHeader(
    type: "Basic" | "Bearer",
    user: string,
    password: string
  ): string {
    return `${type} ${Base64Util.encode(`${user}:${password}`)}`;
  }
}

const util = new HeaderUtil();
export default util;
