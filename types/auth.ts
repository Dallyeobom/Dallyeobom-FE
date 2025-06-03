export interface LoginParams {
  userId: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignUpParams {
  nickname: string;
}
export interface SignUpResponse {
  status: number;
}
