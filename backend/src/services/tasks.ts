import { db } from "../models";
import createHttpError = require("http-errors");
import { TasksDocument } from "../models/tasks";

export const addTask = async (args: { owner: string; title: string }) => {
    const { owner, title } = args;
    const task = await new db.Tasks({
        owner,
        title,
    });
    await task.save();
    return task;
};

export const editTask = async (args: { taskId: string; title: string }) => {
    const { taskId, title } = args;
    const task = (await db.Tasks.findOne({ _id: taskId })) as TasksDocument;
    if (!task) {
        throw createHttpError(400, { code: 200, message: "존재하지 않는 task" });
    }
    task.title = title;
    await task.save();
};
