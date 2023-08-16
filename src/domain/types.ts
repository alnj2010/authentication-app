export interface AuthInfo {
  email: string;
  password: string;
}

interface User extends AuthInfo {
  id: string;
  bio: string;
  name: string;
  phone: string;
}

export interface UserEntity extends User {
  photo: string;
}

export interface UserSubmit extends User {
  photo: File | null;
}

export type LoginResponseDTO = any;

export type CustomResponse<TData> = {
  code: number;
  error?: string;
  data: TData;
};

export type AuthService = (authInfo: AuthInfo) => void;
export type ClientErrorMsg = (fieldName: string) => string;
export type Validator = (value: any) => ClientErrorMsg;

export type ValidationScheme = {
  [key: string]: { value: any; validators: Array<Validator> };
};

export type SocialProviders = "google" | "facebook" | "twitter" | "github";
