export enum AuthConstants {
  JWT_ACCESS_TOKEN_EXPIRATION = '1d',
  ACCESS_TOKEN_EXPIRATION = 24 * 60 * 60 * 1000,
  SESSION_EXPIRATION = 24 * 60 * 60 * 1000,
}

export type Token = string;

/**
 * The payload of the access token.
 */
export interface AccessTokenPayload<T = unknown> {
  iss: string;
  sub: T;
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
  session: Session;
}

/**
 * The DTO for the login method.
 */
export interface LoginDto {
  email: string;
}

/**
 * The DTO for the login or register method.
 */
export interface LoginOrRegisterDto {
  email: string;
  username?: string;
}

/**
 * The authenticated user object.
 */
export interface AuthenticatedUser {
  id: number;
  username: string;
}

/**
 * Interface for the authentication service.
 */
export interface AuthServiceInterface {
  /**
   * Method to login a user.
   *
   * @param loginDto - DTO with the necessary data to login a user.
   *
   * @returns - Returns an object with the access token and the session object.
   */
  login(loginDto: LoginDto): Promise<Credentials>;

  /**
   * The login or register method.
   *
   * @param loginOrRegisterDto DTO with the necessary data to login or register a user.
   *
   * @returns - Returns an object with the access token and the session object.
   */
  loginOrRegister(loginOrRegisterDto: unknown): Promise<Credentials>;

  /**
   * Method to logout a user.
   *
   * @returns - Returns a promise with the status of the logout process.
   */
  logout(): Promise<string>;

  /**
   * Method to register a new user.
   *
   * @param registerDto  - DTO with the necessary data to create a new user.
   *
   * @returns - Returns an object with the access token and the session object.
   */
  register(registerDto: unknown): Promise<Credentials>;
}
