import jwt from "jsonwebtoken";

const SECRET =
  "este secreto tiene que ser almacenado en las variables de entorno del lado del servidor";

class TokenUtil {
  constructor() {}

  createToken(id: string): string {
    return jwt.sign({ sub: id }, SECRET, { expiresIn: "1d" });
  }

  verifyTokenAndGetSub(token: string): string {
    const payload = jwt.verify(token, SECRET) as jwt.JwtPayload;
    return payload["sub"] as string;
  }
}

const util = new TokenUtil();
export default util;
