export interface AuthToken {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}
