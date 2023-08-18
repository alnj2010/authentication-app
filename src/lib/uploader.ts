import { FileUploadeable } from "@/domain/types";
import { S3 } from "aws-sdk";

class S3Uploader {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      region: process.env.S3_REGION,
    });
  }

  async upload(file: FileUploadeable): Promise<string> {
    const params = {
      Bucket: process.env.S3_BUCKET as string,
      Key: file.name,
      Body: file.buffer,
    };

    try {
      const payload = await this.s3.upload(params).promise();
      return payload.Location;
    } catch (err) {
      throw err;
    }
  }
}

const util = new S3Uploader();
export default util;
