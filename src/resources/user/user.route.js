import express from "express";
import auth from '../../utils/auth'
import admin from "../../utils/admin";
const userRouter = express.Router();
import * as controller from "./user.controller";

userRouter.post("/register", controller.createUser);
userRouter.get("/all", controller.getUsers)
userRouter.get("/:id", auth, controller.getUser)
userRouter.patch("/:id/approve", [auth, admin], controller.approveUser)
userRouter.post("/login", controller.login)
userRouter.delete(":id", [auth, admin], controller.deleteUser)
userRouter.patch("/:id/admin", [auth], controller.makeAdmin)
export default userRouter;