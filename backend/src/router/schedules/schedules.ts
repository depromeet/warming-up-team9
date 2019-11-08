import { RequestHandler } from "express";
import Joi from "@hapi/joi";
import moment from "moment";
import { scheduleService } from "../../services";

export const addSchedule: RequestHandler = async (req, res, next) => {
    try {
        const { scheduleDate, taskId, estimatedHour } = await Joi.object({
            scheduleDate: Joi.string().required(),
            taskId: Joi.string().required(),
            estimatedHour: Joi.number()
                .min(1)
                .max(12),
        }).validateAsync(req.body);

        const date = moment(scheduleDate)
            .startOf("day")
            .toDate();

        await scheduleService.addSchedule({ owner: req.user.uid, taskId, estimatedHour, scheduleDate: date });
        res.sendStatus(201);
    } catch (err) {
        next(err);
    }
};
