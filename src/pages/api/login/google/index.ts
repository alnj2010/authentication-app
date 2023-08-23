import { SERVICE_ERROR_NOT_FOUND } from "@/domain/constants";
import { CustomResponse } from "@/domain/types";
import { NextApiRequest, NextApiResponse } from "next";
import queryString from "query-string";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

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

  const scopes = ["openid", "email", "profile"];
  const query = queryString.stringify({
    response_type: "code",
    client_id: process.env.GOOGLE_CLIENT_ID,
    scope: scopes.join(" "),
    redirect_uri: process.env.GOOGLE_REDIRECT_CODE_URL,
  });

 
  res.redirect(302, `${GOOGLE_AUTH_URL}?${query}`);
}
