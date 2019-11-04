import { db } from "../models";
import createHttpError = require("http-errors");
import { TasksDocument } from "../models/tasks";

export interface AddTaskArg {
    owner: string;
    title: string;
}

export interface EditTaskArg {
    taskId: string;
    title: string;
}

export const addTask = async (args: AddTaskArg) => {
    const { owner, title } = args;
    const task = await new db.Tasks({
        owner,
        title,
    });
    await task.save();
    return task;
};

export const editTask = async (args: EditTaskArg) => {
    const { taskId, title } = args;
    const task = (await db.Tasks.findOne({ _id: taskId })) as TasksDocument;
    if (!task) {
        throw createHttpError(400, { code: 200, message: "존재하지 않는 task" });
    }
    task.title = title;
    await task.save();
};
