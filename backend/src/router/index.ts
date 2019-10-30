import express from "express";
import * as users from "./users";

const router = (router: express.Router) => {
    router.route("/login").post(users.login);

    return router;
};

export default router;
