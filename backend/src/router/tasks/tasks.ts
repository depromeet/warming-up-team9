import { RequestHandler } from "express";
import Joi from "@hapi/joi";
import { taskService } from "../../services";

export const addTask: RequestHandler = async (req, res, next) => {
    try {
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
