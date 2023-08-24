import { GOOGLE_AUTH_URL, SERVICE_ERROR_NOT_FOUND } from "@/domain/constants";
import { CustomResponse } from "@/domain/types";
import { NextApiRequest, NextApiResponse } from "next";
import QueryStringUtil from "@/lib/query-string";
import EnvUtil from "@/lib/env";
import CookieUtil from "@/lib/cookie";
import CryptoUtil from "@/lib/crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomResponse<any>>
) {
  if (req.method !== "GET") {
    res.status(404).json({
      code: 404,
      error: SERVICE_ERROR_NOT_FOUND,
      data: null,
    });
    return;
  }

  const csrfState = CryptoUtil.generateRandomCode();
  const scopes = ["openid", "email", "profile"];
  const query = QueryStringUtil.stringify({
    response_type: "code",
    client_id: EnvUtil.get("GOOGLE_CLIENT_ID"),
    scope: scopes.join(" "),
    redirect_uri: EnvUtil.get("GOOGLE_REDIRECT_CODE_URL"),
    state: csrfState,
  });

  const cookie = CookieUtil.serialize("csrf_state", csrfState);
  res.setHeader("Set-Cookie", cookie);
  res.redirect(302, `${GOOGLE_AUTH_URL}?${query}`);
}
