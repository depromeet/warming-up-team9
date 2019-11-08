import { db } from "../models";
import { ScheduleDocument } from "../models/schedules";
import { TasksDocument, TaskStates } from "../models/tasks";
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

    if (schedulesInDate.find(schedule => schedule.taskId === taskId)) {
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
