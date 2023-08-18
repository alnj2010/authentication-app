import { AuthInfo, UserEntity, UserUpdateable } from "@/domain/types";
import { sql } from "@vercel/postgres";
import CryptoUtil from "@/lib/crypto";
import { ApiError } from "next/dist/server/api-utils";
import { SECRET_PASSWORD } from "@/domain/constants";

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

  async updateUser(user: UserUpdateable): Promise<void> {
    if (user.photo && user.password !== SECRET_PASSWORD) {
      await sql`UPDATE users
      SET 
          photo=${user.photo}, 
          password=${CryptoUtil.hashPassword(user.password)},
          name=${user.name}, 
          bio=${user.bio},
          phone=${user.phone},
      WHERE id=${user.id};`;
    } else if (user.photo) {
      await sql`UPDATE users
      SET 
          photo=${user.photo}, 
          name=${user.name}, 
          bio=${user.bio},
          phone=${user.phone},
      WHERE id=${user.id};`;
    } else if (user.password) {
      await sql`UPDATE users
      SET 
          password=${CryptoUtil.hashPassword(user.password)},
          name=${user.name}, 
          bio=${user.bio},
          phone=${user.phone},
      WHERE id=${user.id};`;
    } else {
      await sql`UPDATE users
      SET 
          name=${user.name}, 
          bio=${user.bio},
          phone=${user.phone},
      WHERE id=${user.id};`;
    }
  }
}

const userRepository = new UserRepository();
export default userRepository;
