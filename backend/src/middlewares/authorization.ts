import { RequestHandler } from "express";
import Joi from "@hapi/joi";
import createHttpError from "http-errors";
import { auth } from "../controllers";

export const verifyTokenMiddleware: RequestHandler = async (req, res, next) => {
    const authorization = Joi.string().required();

    const token = await authorization.validateAsync(req.headers.authorization).catch(() => {
        return next(createHttpError(401, { code: 104, message: "Wrong Token" }));
    });

    try {
        req.user = auth.verifyToken(token);
        next();
    } catch (err) {
        next(createHttpError(403, err.message));
    }
};
