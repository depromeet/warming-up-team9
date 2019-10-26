import createError from "http-errors";

interface ApiResponseFormat {
    err?: createError.HttpError;
    data?: object;
}
