import * as mongoose from "mongoose";
import { Tasks } from "./tasks";
import { Schedules } from "./schedules";

export enum ScheduleHistoryState {
    "START" = "START",
    "STOP" = "STOP",
    "RESUME" = "RESUME",
    "DONE" = "DONE",
}

export type ScheduleHistory = {
    taskId: string | Tasks;
    scheduleId: string | Schedules;
    owner: string;
    state: ScheduleHistoryState;
    createdAt: Date;
};

export type ScheduleHistoryDocument = mongoose.Document & ScheduleHistory;

const schema = new mongoose.Schema(
    {
        taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Tasks" },
        scheduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Schedules" },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        state: {
            type: String,
            enum: [
                ScheduleHistoryState.START,
                ScheduleHistoryState.STOP,
                ScheduleHistoryState.RESUME,
                ScheduleHistoryState.DONE,
            ],
        },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    },
);

export default mongoose.model("ScheduleHistories", schema);
