import express from "express";
import * as users from "./users";

const router = (router: express.Router) => {
    router.route("/login").post(users.login);
    router.route("/signup").post(users.signUp);

    return router;
};

export default router;
