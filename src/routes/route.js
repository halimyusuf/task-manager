import express from "express";
import cors from "cors";
import createError from "http-errors";
import projectRouter from "../resources/project/project.route";
import userRouter from "../resources/user/user.route";
import taskRouter from "../resources/tasks/tasks.routes"

export function route(app) {
    app.use(express.json());
    app.use(cors());
    app.use("/api/v1/project", projectRouter);
    app.use("/api/v1/user", userRouter);
    app.use("/api/v1/task", taskRouter);
    app.use((req, res, next) => {
        next(createError(404));
    });
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            status: "error",
            message: err.message
        });
    });
}