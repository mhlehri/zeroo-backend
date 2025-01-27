import jwt, { JwtPayload, SignOptions, Secret } from "jsonwebtoken";

export const createToken = (
  jwtPayload: JwtPayload,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(
    jwtPayload,
    secret as Secret,
    {
      expiresIn,
    } as SignOptions
  );
};
