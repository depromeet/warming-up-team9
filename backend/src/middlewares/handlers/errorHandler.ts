import { ErrorRequestHandler } from "express";
import { ApiResponseFormat } from "src/types/apiResponseFormat";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    const responseData: ApiResponseFormat = {
        err,
    };
    res.json(responseData);
};
