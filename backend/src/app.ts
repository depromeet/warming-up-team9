import express from "express";
import logger from "morgan";
import * as middlewares from "./middlewares";

const PORT = 3000;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(middlewares.notFoundCreator);
app.use(middlewares.errorHandler);

app.listen(PORT, () => {
    console.log(`Server is Listening on port ${PORT}`);
});
