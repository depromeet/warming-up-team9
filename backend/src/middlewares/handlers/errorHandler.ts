import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.status !== 404) {
        console.log(err);
    }
    res.status(err.status || 500);
    res.send({ err });
};
