import { CustomResponse } from "@/domain/types";
import { NextApiRequest, NextApiResponse } from "next";

import CookieUtil from "@/lib/cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomResponse<any>>
) {
  if (req.method === "POST") {
    const cookie = CookieUtil.remove("access_token");
    res.setHeader("Set-Cookie", cookie);
    
    res.status(200).json({ code: 200, data: "Successfully Logout" });
  }
}
