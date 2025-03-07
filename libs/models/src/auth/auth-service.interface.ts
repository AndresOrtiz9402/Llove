export type Token = string;

/**
 * Authorization header.
 */
export interface AuthorizationHeader {
  Authorization: string;
}

/**
 * The payload of the access token.
 */
export interface AccessTokenPayload {
  iss: string;
  sub: number;
  exp: number;
  iat: number;
}

/**
 * The payload of the refresh token.
 */
export interface RefreshTokenPayload {
  iss: string;
  sub: number;
  exp: number;
  iat: number;
}

/**
 * The session object.
 */
export interface Session {
  username: string;
  createAt: Date;
  expiresAt: Date;
}

/**
 * The response of the authentication process.
 */
export interface Credentials {
  accessToken: Token;
  refreshToken: Token;
  session: Session;
}

/**
 * Interface for the authentication service.
 */
export interface AuthServiceInterface {
  /**
   * Method to register a new user.
   *
   * @param registerDto  - DTO with the necessary data to create a new user.
   *
   * @returns - Returns an object with the access token, the refresh token and the session object.
   */
  register(registerDto: unknown): Promise<Credentials>;

  /**
   * Method to login a user.
   *
   * @param loginDto - DTO with the necessary data to login a user.
   *
   * @returns - Returns an object with the access token, the refresh token and the session object.
   */
  login(loginDto: unknown): Promise<Credentials>;

  /**
   * Method to logout a user.
   *
   * @returns - Returns a promise with the status of the logout process.
   */
  logout(): Promise<string>;
}
