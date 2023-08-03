export type User = {
  photo: string;
  bio: string;
  name: string;
  phone: string;
  email: string;
  password: string;
};

export type AuthInfo = {
  email: string;
  password: string;
};

export type ApiResponse<T> = {
  ok: boolean;
  data: T;
};

export type LoginResponseDTO = any;

export type CustomResponse<TData> = {
  code: number;
  error?: string;
  data?: TData;
};
