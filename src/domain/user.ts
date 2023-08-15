import { UserEntity } from "@/domain/types";

export class User {
  public email: string;
  public password: string;
  public id: string;
  public bio: string;
  public name: string;
  public phone: string;
  public photo: string;
  constructor(user: UserEntity) {
    this.email = user.email ?? "";
    this.password = user.password ?? "";
    this.id = user.id ?? "";
    this.bio = user.bio ?? "";
    this.name = user.name ?? "";
    this.phone = user.phone ?? "";
    this.photo =  "****";
  }
}
