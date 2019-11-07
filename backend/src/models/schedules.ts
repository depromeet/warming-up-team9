import * as mongoose from "mongoose";

export type ScheduleDocument = mongoose.Document & {
    taskId: string;
    owner: string;
    estimatedHour: number;
    playedTimeSec: number;
    scheduleDate: Date;
    createdAt: Date;
};

const schema = new mongoose.Schema(
    {
        taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Tasks" },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        estimatedHour: { type: Number, min: 1, max: 12 },
        playedTimeSec: { type: Number, default: 0 },
        scheduleDate: { type: Date },
        review: { type: String },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    },
);

export default mongoose.model("Schedules", schema);
