import { RequestHandler } from "express";
import Joi from "@hapi/joi";
import bcryptjs from "bcryptjs";
import createHttpError from "http-errors";
import { db } from "../../models";

export const login: RequestHandler = (req, res, next) => {
    try {
        res.json({
            token: "tokenExample",
        });
    } catch (err) {
        throw err;
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
        const { email, nickname, password } = await schema.validateAsync(req.body).catch(err => {
            throw createHttpError(400, err.message);
        });

        const passwordHash = await bcryptjs.hashSync(password);
        const user = new db.Users({
            email,
            nickname,
            passwordHash,
        });
        await user.save();

        res.send(user);
    } catch (err) {
        next(err);
    }
};
