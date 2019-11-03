import { TokenPayload } from "../models/users";
import { sign } from "jsonwebtoken";
import config from "../config";

export const makeJWT = (payload: TokenPayload) => {
    const token = sign(payload, config.jwt.SECRET_KEY, {
        expiresIn: config.jwt.EXPIRES,
    });
    return token;
};
