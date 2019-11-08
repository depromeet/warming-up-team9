import express from "express";
import * as users from "./users";
import * as tasks from "./tasks";
import * as schedules from "./schedules";
import { verifyTokenMiddleware } from "../middlewares";

const router = (router: express.Router) => {
    router.route("/health-check").get((req, res) => res.sendStatus(200));

    router.route("/auth/login").post(users.login);
    router.route("/users").post(users.signUp);
    router.route("/users/me").get([verifyTokenMiddleware, users.getUser]);
    router
        .route("/users/me/tasks")
        .post([verifyTokenMiddleware, tasks.addTask])
        .get([verifyTokenMiddleware, tasks.getTasks]);
    router
        .route("/users/me/tasks/:taskId")
        .get([verifyTokenMiddleware, tasks.getTask])
        .put([verifyTokenMiddleware, tasks.editTask])
        .delete([verifyTokenMiddleware, tasks.deleteTask]);
    router.route("/users/me/tasks/:taskId/done").post([verifyTokenMiddleware, tasks.completeTask]);
    router.route("/users/me/schedules").post([verifyTokenMiddleware, schedules.addSchedule]);
    router.route("/users/me/schedules/:targetDate").get([verifyTokenMiddleware, schedules.getSchedule]);

    return router;
};

export default router;
