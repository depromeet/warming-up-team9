import express from "express";
import * as users from "./users";
import * as tasks from "./tasks";
import { verifyTokenMiddleware } from "../middlewares";

const router = (router: express.Router) => {
    router.route("/auth/login").post(users.login);
    router.route("/users").post(users.signUp);
    router.route("/users/me").get([verifyTokenMiddleware, users.getUser]);
    router.route("/tasks").post([verifyTokenMiddleware, tasks.addTask]);
    router.route("/tasks/:taskId").put([verifyTokenMiddleware, tasks.editTask]);

    return router;
};

export default router;
