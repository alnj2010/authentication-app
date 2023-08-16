import { AuthInfo, UserEntity } from "@/domain/types";
import { sql } from "@vercel/postgres";
import CryptoUtil from "@/lib/crypto";
import { ApiError } from "next/dist/server/api-utils";

class UserRepository {
  constructor() {}

  async getUserByEmail(email: string): Promise<UserEntity> {
    const {
      rows: [user],
    } = await sql`SELECT * FROM users WHERE users.email = ${email};`;

    if (!user) {
      throw new ApiError(404, "Email not found");
    }

    return user as UserEntity;
  }

  async doesUserEmailExist(email: string): Promise<boolean> {
    try {
      await this.getUserByEmail(email);
      return true;
    } catch {
      return false;
    }
  }

  async createUserByCredentials(credentials: AuthInfo): Promise<void> {
    const hashedPassword = CryptoUtil.hashPassword(credentials.password);

    await sql`INSERT INTO users (email, password) VALUES (${credentials.email}, ${hashedPassword});`;
  }

  async getUserById(id: string): Promise<UserEntity> {
    const {
      rows: [user],
    } = await sql`SELECT * FROM users WHERE users.id = ${id};`;

    if (!user) {
      throw new ApiError(404, "id not found");
    }

    return user as UserEntity;
  }
}

const userRepository = new UserRepository();
export default userRepository;
