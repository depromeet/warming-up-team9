import { TokenPayload } from "../models/users";
import { sign, verify } from "jsonwebtoken";
import config from "../config";

export const makeJWT = (payload: TokenPayload) => {
    const token = sign(payload, config.jwt.SECRET_KEY, {
        expiresIn: config.jwt.EXPIRES,
    });
    return token;
};

export const verifyToken = (token: string): TokenPayload => {
    return verify(token, config.jwt.SECRET_KEY) as TokenPayload;
};
