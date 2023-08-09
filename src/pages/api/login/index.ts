import { LOGIN_SERVICE_ERROR_INVALID_CREDENTIALS } from "@/domain/constants";
import { CustomResponse } from "@/domain/types";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomResponse<any>>
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    console.log({ email, password });

    throw new Error("some Error");
    res.status(401).json({
      code: 401,
      error: LOGIN_SERVICE_ERROR_INVALID_CREDENTIALS,
      data: null,
    });
  }
}
