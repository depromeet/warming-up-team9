import { db } from "../models";
import { ScheduleDocument, ScheduleStates } from "../models/schedules";
import { TasksDocument, TaskStates } from "../models/tasks";
import { Moment } from "moment";
import { scheduleHistoryService } from "./index";
import { ScheduleHistoryDocument, ScheduleHistoryState } from "../models/scheduleHistories";
import createHttpError = require("http-errors");

const HOUR_LIMIT_PER_DAY = 12;

export const addSchedule = async (args: {
    taskId: string;
    owner: string;
    estimatedHour: number;
    scheduleDate: Date;
}) => {
    const { taskId, owner, estimatedHour, scheduleDate } = args;
    const task = (await db.Tasks.findById(taskId)) as TasksDocument;
    if (!task) {
        throw createHttpError(400, { code: 200, message: "존재하지 않는 task" });
    }

    if (task.state === TaskStates.DONE) {
        throw createHttpError(400, { code: 201, message: "이미 종료된 task " });
    }

    const schedulesInDate = (await db.Schedules.find({ owner, scheduleDate })) as ScheduleDocument[];

    if (schedulesInDate.find(schedule => schedule.taskId.toString() === taskId)) {
        throw createHttpError(400, { code: 202, message: "이미 해당일에 등록된 task" });
    }

    const currentTotalHour = schedulesInDate.reduce((memo, schedule): number => (memo += schedule.estimatedHour), 0);

    if (currentTotalHour >= HOUR_LIMIT_PER_DAY || currentTotalHour + estimatedHour > HOUR_LIMIT_PER_DAY) {
        throw createHttpError(400, { code: 203, message: "12시간의 하루 제한량 초과" });
    }

    const schedule = new db.Schedules({
        ...args,
    });
    await schedule.save();
};

export const getSchedule = async (arg: { owner: string; date: Date }) => {
    const { owner, date } = arg;
    const schedules = (await db.Schedules.find({ owner, scheduleDate: date }).populate("taskId")) as ScheduleDocument[];
    return schedules.map(schedule => {
        if (typeof schedule.taskId !== "string") {
            return {
                scheduleId: schedule._id,
                taskId: schedule.taskId._id,
                title: schedule.taskId.title,
                estimatedHour: schedule.estimatedHour,
                processTimeSec: schedule.processTimeSec,
                state: schedule.state,
            };
        }
    });
};

export const getSchedules = async (arg: { owner: string; startDate: Moment; endDate: Moment }) => {
    const { owner, startDate, endDate } = arg;
    const schedules = (await db.Schedules.find({
        owner,
        scheduleDate: { $gte: startDate.toDate(), $lt: endDate.toDate() },
    })) as ScheduleDocument[];

    const days = endDate.diff(startDate, "day");
    const resultArray = [];
    for (let i = 0; i < days; i++) {
        const date = startDate.clone().add(i, "day");
        const specificDateSchedules = schedules.filter(
            schedule => schedule.scheduleDate.valueOf() === date.toDate().valueOf(),
        );
        resultArray.push({
            hasSchedule: specificDateSchedules.length > 0,
            hasReview: specificDateSchedules.filter(schedule => schedule.review).length > 0,
        });
    }

    return resultArray;
};

export const handleScheduleHistory = async (args: {
    owner: string;
    scheduleId: string;
    scheduleHistoryState: ScheduleHistoryState;
}) => {
    const { owner, scheduleId, scheduleHistoryState } = args;
    const schedule = (await db.Schedules.findOne({
        _id: scheduleId,
    })) as ScheduleDocument;
    if (!schedule) {
        throw createHttpError(400, { code: 300, message: "존재하지 않는 스케쥴" });
    }
    if (schedule.owner.toString() !== owner) {
        throw createHttpError(403);
    }

    const createdAt = new Date();

    const lastScheduleHistory = (await db.ScheduleHistories.findOne({
        owner,
        scheduleId,
        taskId: schedule.taskId,
    }).sort({ createdAt: -1 })) as ScheduleHistoryDocument;

    switch (scheduleHistoryState) {
        case ScheduleHistoryState.START: {
            if (schedule.state !== ScheduleStates.READY) {
                throw createHttpError(400, { code: 306, message: "시작 할 수 없는 상태" });
            }
            schedule.state = ScheduleStates.PROCESSING;
            break;
        }
        case ScheduleHistoryState.DONE: {
            if (schedule.state !== ScheduleStates.PROCESSING) {
                throw createHttpError(400, { code: 307, message: "이미 시작한 스케줄" });
            }
            const processTimeSec = parseInt(
                ((createdAt.valueOf() - lastScheduleHistory.createdAt.valueOf()) / 1000).toFixed(0),
            );
            schedule.processTimeSec += processTimeSec;
            schedule.state = ScheduleStates.DONE;
            break;
        }
        case ScheduleHistoryState.RESUME: {
            if (schedule.state !== ScheduleStates.PROCESSING) {
                throw createHttpError(400, { code: 308, message: "재시작 할 수 없는 상태" });
            }
            break;
        }
        case ScheduleHistoryState.STOP: {
            if (schedule.state !== ScheduleStates.PROCESSING) {
                throw createHttpError(400, { code: 309, message: "중지 할 수 없는 상태" });
            }

            const processTimeSec = parseInt(
                ((createdAt.valueOf() - lastScheduleHistory.createdAt.valueOf()) / 1000).toFixed(0),
            );
            schedule.processTimeSec += processTimeSec;
            break;
        }
        default: {
            break;
        }
    }

    await scheduleHistoryService.addHistory({
        owner,
        scheduleId,
        taskId: schedule.taskId.toString(),
        state: scheduleHistoryState,
        createdAt,
    });
    await schedule.save();
};

export const getTaskTimeSec = async (arg: { owner: string; taskId: string }) => {
    const { owner, taskId } = arg;
    const schedules = (await db.Schedules.find({ owner, taskId })) as ScheduleDocument[];
    return schedules.reduce((memo, schedule) => {
        return (memo += schedule.processTimeSec);
    }, 0);
};
