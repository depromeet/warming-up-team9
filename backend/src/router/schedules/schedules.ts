import { RequestHandler } from "express";
import Joi from "@hapi/joi";
import { scheduleService } from "../../services";

export const addSchedule: RequestHandler = async (req, res, next) => {
    try {
        const { scheduleDate, taskId, estimatedHour } = await Joi.object({
            scheduleDate: Joi.date().required(),
            taskId: Joi.string().required(),
            estimatedHour: Joi.number()
                .min(1)
                .max(12),
        }).validateAsync(req.body);

        await scheduleService.addSchedule({ owner: req.user.uid, taskId, estimatedHour, scheduleDate });
        res.sendStatus(201);
    } catch (err) {
        next(err);
    }
};
