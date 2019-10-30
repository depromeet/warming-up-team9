import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500);
    res.send({ err });
};
