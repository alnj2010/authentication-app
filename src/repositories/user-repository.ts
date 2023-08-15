import { SECRET_PASSWORD, UNDEFINED_PHOTO } from "@/domain/constants";
import { RepositoryError } from "@/domain/errors/repository-error";
import { AuthInfo, UserEntity } from "@/domain/types";
import { sql } from "@vercel/postgres";
import { createHash } from "crypto";

class UserRepository {
  constructor() {}

  async getUserByEmail(email: string): Promise<UserEntity> {
    const {
      rows: [user],
    } = await sql`SELECT * FROM users WHERE users.email = ${email};`;

    if (!user) {
      throw new RepositoryError("Email not found");
    }

    user.password = SECRET_PASSWORD;
    user.photo =
      !user.photo || user.photo === "" ? UNDEFINED_PHOTO : user.photo;
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
    const hashedPassword = createHash("sha256")
      .update(credentials.password)
      .digest("hex");

    await sql`INSERT INTO users (email, password) VALUES (${credentials.email}, ${hashedPassword});`;
  }

  async getUserById(id: string): Promise<UserEntity> {
    const {
      rows: [user],
    } = await sql`SELECT * FROM users WHERE users.id = ${id};`;

    if (!user) {
      throw new RepositoryError("id not found");
    }

    user.password = SECRET_PASSWORD;
    user.photo =
      !user.photo || user.photo === "" ? UNDEFINED_PHOTO : user.photo;
    return user as UserEntity;
  }
}

const userRepository = new UserRepository();
export default userRepository;
