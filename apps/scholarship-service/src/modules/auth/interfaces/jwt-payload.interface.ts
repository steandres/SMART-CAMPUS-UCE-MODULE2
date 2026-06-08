// Defines the JWT claims expected from the future centralized Auth Service.
export interface JwtPayload {
  sub: string;
  email?: string;
  roles?: string[];
  permissions?: string[];
  iss?: string;
  aud?: string;
  iat?: number;
  exp?: number;
}
