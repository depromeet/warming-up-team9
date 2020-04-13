import mongoose from "mongoose";

import config from "../config";
import Users from "./users";
import Tasks from "./tasks";
import Schedules from "./schedules";
import ScheduleHistories from "./scheduleHistories";

const env: string = process.env.NODE_ENV || "development";

export const init = async () => {
    try {
        mongoose.set("useUnifiedTopology", true);
        const connection = await mongoose.connect(config.mongo[env], { useNewUrlParser: true });
        console.log(`MongoDB Connection Success [ENV: ${env}]`);
        return connection;
    } catch (e) {
        throw `MongoDB Connection Fail, ${e.message}`;
    }
};

export const db = {
    Users,
    Tasks,
    Schedules,
    ScheduleHistories,
};
