import { SERVICE_ERROR_UNAUTHORIZED } from "@/domain/constants";
import jwt from "jsonwebtoken";
import { ApiError } from "next/dist/server/api-utils";

const SECRET: string = process.env.SECRET_SIGN_PASSWORD ?? "secret undefined";

class TokenUtil {
  constructor() {}

  createToken(id: string): string {
    return jwt.sign({ sub: id }, SECRET, { expiresIn: "1d" });
  }

  verifyTokenAndGetSub(token: string): string {
    try {
      const payload = jwt.verify(token, SECRET) as jwt.JwtPayload;
      return payload["sub"] as string;
    } catch (error) {
      throw new ApiError(401, SERVICE_ERROR_UNAUTHORIZED);
    }
  }

  decode(token: string): jwt.JwtPayload {
    const payload = jwt.decode(token);
    if (!payload) {
      throw new ApiError(401, SERVICE_ERROR_UNAUTHORIZED);
    }
    return payload as jwt.JwtPayload;
  }
}

const util = new TokenUtil();
export default util;
