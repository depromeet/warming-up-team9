import "source-map-support/register";
import express from "express";
import logger from "morgan";
import cors from "cors";
import * as middlewares from "./middlewares";
import router from "./router";
import * as db from "./models";

const PORT = 3000;

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router(express.Router()));
app.use(middlewares.notFoundCreator);
app.use(middlewares.errorHandler);

(async () => {
    try {
        await db.init();

        app.listen(PORT, () => {
            console.log(`Server is Listening on port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
