import { db } from "../models";

export interface AddTaskArg {
    owner: string;
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
