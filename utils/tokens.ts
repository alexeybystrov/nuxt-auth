import { SignJWT, jwtVerify } from 'jose';
import { Types } from 'mongoose';

export const sign = async (id: Types.ObjectId, secret: string) => {
  const payload = {
    id,
  };
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60; // one minute

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));

  return jwt;
};

export const verify = async (token: string, secret: string) => {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));

  return payload;
};
