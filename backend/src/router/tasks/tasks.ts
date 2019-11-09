import { RequestHandler } from "express";
import Joi from "@hapi/joi";
import { scheduleService, taskService } from "../../services";

export const addTask: RequestHandler = async (req, res, next) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required(),
        });
        const { title } = await schema.validateAsync(req.body);

        const { _id, title: titleCreated, state, createdAt } = await taskService.addTask({
            title,
            owner: req.user.uid,
        });
        res.status(201).json({
            taskId: _id,
            title: titleCreated,
            state,
            createdAt,
        });
    } catch (err) {
        next(err);
    }
};

export const getTask: RequestHandler = async (req, res, next) => {
    try {
        const { uid } = req.user;
        const taskId = await Joi.string()
            .required()
            .validateAsync(req.params.taskId);
        const [task, processTimeSumSec] = await Promise.all([
            taskService.getTask({ owner: uid, taskId }),
            scheduleService.getTaskTimeSec({ owner: uid, taskId }),
        ]);
        res.json({
            taskId: task._id,
            title: task.title,
            state: task.state,
            processTimeSumSec,
        });
    } catch (err) {
        next(err);
    }
};

export const editTask: RequestHandler = async (req, res, next) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required(),
        });
        const taskId = await Joi.string()
            .required()
            .validateAsync(req.params.taskId);
        const { title } = await schema.validateAsync(req.body);

        await taskService.editTask({ taskId, title });
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};

export const getTasks: RequestHandler = async (req, res, next) => {
    try {
        const { uid } = req.user;
        const { filter } = await Joi.object({
            filter: Joi.string(),
        }).validateAsync(req.query);
        const tasks = await taskService.getTasks({ owner: uid, filter });
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

export const deleteTask: RequestHandler = async (req, res, next) => {
    try {
        const { uid } = req.user;
        const taskId = await Joi.string()
            .required()
            .validateAsync(req.params.taskId);

        const tasks = await taskService.deleteTask({ owner: uid, taskId });
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

export const completeTask: RequestHandler = async (req, res, next) => {
    try {
        const { uid } = req.user;
        const taskId = await Joi.string()
            .required()
            .validateAsync(req.params.taskId);

        const tasks = await taskService.completeTask({ owner: uid, taskId });
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};
