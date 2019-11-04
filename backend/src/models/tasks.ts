import * as mongoose from "mongoose";

export enum TaskStates {
    "PENDING" = "PENDING",
    "DONE" = "DONE",
    "DELETE" = "DELETE",
}

export type TasksDocument = mongoose.Document & {
    title: string;
    state: TaskStates;
    owner: string;
};

const schema = new mongoose.Schema(
    {
        title: { type: String },
        state: {
            type: String,
            enum: [TaskStates.PENDING, TaskStates.DONE, TaskStates.DELETE],
            default: TaskStates.PENDING,
        },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    },
);

class TasksClass {}

schema.loadClass(TasksClass);

export default mongoose.model("Tasks", schema);
