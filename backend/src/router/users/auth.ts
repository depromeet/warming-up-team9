import { RequestHandler } from "express";
import Joi from "@hapi/joi";
import createHttpError from "http-errors";
import { userService } from "../../services";

export const login: RequestHandler = async (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string().required(),
        });

        const loginArgs = await schema.validateAsync(req.body).catch(err => {
            throw createHttpError(400, err.message);
        });

        const token = await userService.login(loginArgs);

        res.json({
            token,
        });
    } catch (err) {
        next(err);
    }
};

export const signUp: RequestHandler = async (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.string()
                .email()
                .required(),
            nickname: Joi.string()
                .min(1)
                .max(10)
                .required(),
            password: Joi.string()
                .min(6)
                .max(50)
                .alphanum()
                .required(),
        });
        const signUpArgs = await schema.validateAsync(req.body).catch(err => {
            throw createHttpError(400, err.message);
        });

        const token = await userService.signUp(signUpArgs);
        res.json({ token });
    } catch (err) {
        next(err);
    }
};

export const getUser: RequestHandler = async (req, res, next) => {
    try {
        const getUserArgs = { uid: req.user.uid };
        const userInfo = await userService.getUser(getUserArgs);
        res.json({
            email: userInfo.email,
            nickname: userInfo.nickname,
        });
    } catch (err) {
        next(err);
    }
};
