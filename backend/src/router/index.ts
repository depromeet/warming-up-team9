import express from "express";
import * as users from "./users";
import { verifyTokenMiddleware } from "../middlewares";

const router = (router: express.Router) => {
    router.route("/auth/login").post(users.login);
    router.route("/users").post(users.signUp);
    router.route("/users/me").get([verifyTokenMiddleware, users.getUser]);

    return router;
};

export default router;
