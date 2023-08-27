import { CustomResponse } from "@/domain/types";
import { NextApiRequest, NextApiResponse } from "next";

import CookieUtil from "@/lib/cookie";
import { SERVICE_ERROR_NOT_FOUND } from "@/domain/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomResponse<string>>
) {
  if (req.method !== "POST") {
    res.status(404).json({
      error: SERVICE_ERROR_NOT_FOUND,
    });
    return;
  }
  const cookie = CookieUtil.remove("access_token");
  res.setHeader("Set-Cookie", cookie);

  res.status(200).json({ data: "Successfully Logout" });
}
