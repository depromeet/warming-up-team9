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

export const getSchedule: RequestHandler = async (req, res, next) => {
    try {
        const targetDate = await Joi.string().validateAsync(req.params.targetDate);
        const date = moment(targetDate)
            .startOf("day")
            .toDate();
        const schedules = await scheduleService.getSchedule({ owner: req.user.uid, date });
        res.json(schedules);
    } catch (err) {
        next(err);
    }
};

export const getSchedules: RequestHandler = async (req, res, next) => {
    try {
        const { startDate: sd, endDate: ed } = await Joi.object({
            startDate: Joi.string().required(),
            endDate: Joi.string().required(),
        }).validateAsync(req.query);

        const startDate = moment(sd).startOf("day");
        const endDate = moment(ed)
            .startOf("day")
            .add(1, "day");

        const schedules = await scheduleService.getSchedules({ owner: req.user.uid, startDate, endDate });
        res.json(schedules);
    } catch (err) {
        next(err);
    }
};
