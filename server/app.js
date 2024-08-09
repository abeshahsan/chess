import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import requestsRouter from "./api/requests.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

var app = express();

// view engine setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set("views", join(__dirname, "views"));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
    expressSession({
        secret: "kaane-kaane-boli-shuno",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(express.static(join(__dirname, "public")));

app.use("/api", requestsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

export default app;

