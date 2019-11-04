import * as mongoose from "mongoose";

export enum TaskStates {
    "PENDING",
    "DONE",
}

export type TasksDocument = mongoose.Document & {
    email: string;
    nickname: string;
    passwordHash: string;
};

const schema = new mongoose.Schema(
    {
        title: { type: String },
        state: { type: String, enum: [TaskStates.PENDING, TaskStates.DONE], default: TaskStates.PENDING },
        owner: { type: mongoose.Types.ObjectId, ref: "Users" },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    },
);

class TasksClass {}

schema.loadClass(TasksClass);

export default mongoose.model("Tasks", schema);
