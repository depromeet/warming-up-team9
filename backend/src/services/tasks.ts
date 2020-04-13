import { db } from "../models";
import { TasksDocument, TaskStates } from "../models/tasks";
import createHttpError = require("http-errors");

export const addTask = async (args: { owner: string; title: string }) => {
    const { owner, title } = args;
    const task = (await new db.Tasks({
        owner,
        title,
    })) as TasksDocument;
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

export const getTask = async (args: { owner: string; taskId: string }) => {
    const { owner, taskId } = args;
    const task = (await db.Tasks.findOne({ _id: taskId, state: { $ne: TaskStates.DELETE } })) as TasksDocument;
    if (!task) {
        throw createHttpError(400, { code: 200, message: "존재하지 않는 task" });
    }
    if (task.owner.toString() !== owner) {
        throw createHttpError(403);
    }
    return task;
};

export const getTasks = async (args: { owner: string; filter?: string }) => {
    const { owner, filter } = args;
    const query = {
        owner,
        state: filter === TaskStates.DONE ? TaskStates.DONE : { $ne: TaskStates.DELETE },
    };

    const tasks = (await db.Tasks.find(query).sort({ state: -1, createdAt: -1 })) as TasksDocument[];
    return tasks.map(task => {
        return {
            taskId: task._id,
            title: task.title,
            state: task.state,
            createdAt: task.createdAt,
        };
    });
};

export const deleteTask = async (args: { owner: string; taskId: string }) => {
    const { owner, taskId } = args;
    const task = (await db.Tasks.findOne({ _id: taskId })) as TasksDocument;
    if (!task) {
        throw createHttpError(400, { code: 200, message: "존재하지 않는 task" });
    }
    if (task.owner.toString() !== owner) {
        throw createHttpError(403);
    }
    await db.Tasks.updateOne({ _id: taskId }, { $set: { state: TaskStates.DELETE } });
};

export const completeTask = async (args: { owner: string; taskId: string }) => {
    const { owner, taskId } = args;
    const task = (await db.Tasks.findOne({ _id: taskId })) as TasksDocument;
    if (!task) {
        throw createHttpError(400, { code: 200, message: "존재하지 않는 task" });
    }
    if (task.owner.toString() !== owner) {
        throw createHttpError(403);
    }

    // TODO: 진행중이거나 예정인 스케쥴이 있는지 검사 후 변경 필요
    task.state = TaskStates.DONE;
    await task.save();
};
