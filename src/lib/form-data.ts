import { UserSubmit } from "@/domain/types";
import { NextApiRequest } from "next";
import formidable from "formidable";
import { ApiError } from "next/dist/server/api-utils";
import { SERVICE_ERROR_INVALID_REQUEST } from "@/domain/constants";
import * as fs from "fs";

class FormDataUtil {
  constructor() {}

  async getUserAndPhotoByRequest(req: NextApiRequest): Promise<UserSubmit> {
    try {
      const form = formidable({});

      const [fields, files] = await form.parse(req);
      
      const user: UserSubmit = {
        name: fields.name[0],
        bio: fields.bio[0],
        phone: fields.phone[0],
        password: fields.password[0],
        photo: null,
      };
      if (!Object.keys(files).length) {
        return user;
      }

      const buffer = fs.readFileSync(files.photo[0].filepath);
      user.photo = {
        name:
          (files.photo[0] as formidable.File).originalFilename ?? "unnameless",
        size: (files.photo[0] as formidable.File).size,
        mimetype: (files.photo[0] as formidable.File).mimetype ?? "",
        buffer: buffer,
      };
      return user;
    } catch (error) {
      throw new ApiError(400, SERVICE_ERROR_INVALID_REQUEST);
    }
  }
}

const util = new FormDataUtil();
export default util;
