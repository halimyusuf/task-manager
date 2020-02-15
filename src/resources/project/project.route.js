import express from "express";
import auth from '../../utils/auth'
import admin from "../../utils/admin";
const projectRouter = express.Router();
import * as controller from "./project.controller";

projectRouter.post("/", [auth, admin], controller.createProject)
projectRouter.get("/all", auth, controller.getProjects)
projectRouter.get("my-projects", controller.getMyProjects)
projectRouter.get("/:id", auth, controller.getProject)
projectRouter.delete("/:id", [auth, admin], controller.deleteProject)
projectRouter.patch("/:id", [auth, admin], controller.editProject)
export default projectRouter;