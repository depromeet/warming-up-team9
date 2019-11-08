import { ScheduleHistory, ScheduleHistoryDocument, ScheduleHistoryState } from "../models/scheduleHistories";
import { db } from "../models";
import createHttpError = require("http-errors");

export const addHistory = async (arg: ScheduleHistory) => {
    const { taskId, scheduleId, state, owner, createdAt } = arg;
    const previousHistory = (await db.ScheduleHistories.find({
        taskId,
        scheduleId,
        owner,
    }).sort({ createdAt: -1 })) as ScheduleHistoryDocument[];

    switch (state) {
        case ScheduleHistoryState.START: {
            if (previousHistory.length > 0) {
                throw createHttpError(400, { code: 303, message: "이미 시작한 Schedule" });
            }
            break;
        }
        case ScheduleHistoryState.STOP:
        case ScheduleHistoryState.DONE: {
            if (
                previousHistory.length < 1 ||
                ![ScheduleHistoryState.START, ScheduleHistoryState.RESUME].includes(previousHistory[0].state)
            ) {
                throw createHttpError(400, { code: 304, message: "시작하지 않은 Schedule" });
            }
            break;
        }
        case ScheduleHistoryState.RESUME: {
            if (previousHistory.length < 1 && previousHistory[0].state !== ScheduleHistoryState.STOP) {
                throw createHttpError(400, { code: 305, message: "중지상태가 아닌 Schedule" });
            }
            break;
        }
        default: {
            throw createHttpError(400, { code: 302, message: "알 수 없는 Type" });
        }
    }

    const history = new db.ScheduleHistories({
        taskId,
        scheduleId,
        owner,
        state,
        createdAt,
    });
    await history.save();
    return history;
};
