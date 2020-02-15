import Task from "./tasks.model";
import _ from "lodash";

export async function createTask(req, res) {
    const task = new Task(_.pick(req.body, ["description", "project"]));
    await task.save();
    res.status(200).send({
        status: "success",
        id: task._id
    });
}

export async function deleteTask(req, res) {
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task)
        return res.status(404).send("The Task with the given ID was not found.");

    res.send(task);
}

export async function editTask(req, res) {
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        _.pick(req.body, ["description"])
    );
    if (!task)
        return res.status(404).send("The task with the given ID was not found.");

    res.send(task);
}

export async function getTasks(req, res) {
    const tasks = await Task.find();
    if (!tasks) res.status(404).send("No task found")
    res.status(200).send(tasks);
}

export async function markTaskDone(req, res) {
    const task = await Task.findById(req.params.id)
    const bool = task.done ? false : true;
    task.done = bool;
    task.save()

    if (!task) return res.status(404).send('The user with the given ID was not found.');
    res.status(200).send(task)
}