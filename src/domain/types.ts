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

interface UserBasicSubmitInfo {
  bio: string;
  name: string;
  phone: string;
  password: string;
}

export interface UserSubmit extends UserBasicSubmitInfo {
  photo: File | null;
}

export interface UserServer extends UserBasicSubmitInfo {
  photo: FileUploadeable | null;
}

export interface UserUpdateable extends UserBasicSubmitInfo {
  id: string;
  photo: string | null;
}

export type LoginResponseDTO = any;

export type CustomResponse<TData> = {
  code: number;
  error?: string;
  data: TData;
};

export type AuthService = (authInfo: AuthInfo) => Promise<void>;
export type ClientErrorMsg = (fieldName: string) => string;
export type Validator = (value: any) => ClientErrorMsg;

export type ValidationScheme = {
  [key: string]: { value: any; validators: Array<Validator> };
};

export type SocialProviders = "google" | "facebook" | "twitter" | "github";

export type FileUploadeable = {
  size: number;
  mimetype: string;
  name: string;
  buffer: Buffer;
};
