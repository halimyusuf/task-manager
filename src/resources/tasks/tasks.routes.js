import express from 'express'
const taskRouter = express.Router()
import auth from '../../utils/auth'
import admin from '../../utils/admin'
import * as controller from './tasks.controller'

taskRouter.get("/:id", auth, controller.getTasks)
taskRouter.post("/", [auth, admin], controller.createTask)
taskRouter.delete("/:id", [auth, admin], controller.deleteTask)
taskRouter.patch("/:id", [auth, admin], controller.editTask)
taskRouter.patch("/:id/done", auth, controller.markTaskDone)

export default taskRouter