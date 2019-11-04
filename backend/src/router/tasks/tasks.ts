import { RequestHandler } from "express";
import Joi from "@hapi/joi";
import { taskService } from "../../services";
import createHttpError from "http-errors";

export const addTask: RequestHandler = async (req, res, next) => {
    try {
        if (!req.user) {
            return next(createHttpError(401));
        }
        const schema = Joi.object({
            title: Joi.string().required(),
        });
        const { title } = await schema.validateAsync(req.body);

        await taskService.addTask({ title, owner: req.user.uid });
        res.sendStatus(201);
    } catch (err) {
        next(err);
    }
};
