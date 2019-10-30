import createHttpError from "http-errors";
import express from "express";

export const notFoundCreator: express.RequestHandler = (req, res, next) => {
    next(createHttpError(404));
};
