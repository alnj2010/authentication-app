export interface AuthInfo {
  email: string;
  password: string;
}

interface User extends AuthInfo {
  bio: string;
  name: string;
  phone: string;
  photo: string;
}

export interface UserEntity extends User {
  id: string;
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

export interface UserCreateable extends UserBasicSubmitInfo {
  email: string;
  photo: string;
}

export type LoginResponseDTO = any;

export type CustomResponse<TData> = {
  error?: string;
  data?: TData;
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

export type SocialInfo = {
  name: string;
  picture: string;
  email: string;
};
