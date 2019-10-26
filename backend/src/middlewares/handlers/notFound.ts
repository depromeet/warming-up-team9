import createError from "http-errors";
import express from "express";

export const notFoundCreator: express.RequestHandler = (req, res, next) => {
    next(createError(404));
};
