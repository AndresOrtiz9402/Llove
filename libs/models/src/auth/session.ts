interface UserSession {
  sub: number;
  username: string;
  iat: number;
  exp: number;
}

export interface Session {
  user: UserSession;
}
