import { RequestHandler } from "express";

export const login: RequestHandler = (req, res, next) => {
    try {
        res.json({
            token: "tokenExample",
        });
    } catch (err) {
        throw err;
    }
};
