import Project from "./project.model";
import _ from "lodash";
import Task from "../tasks/tasks.model";

export async function createProject(req, res) {
  const project = new Project(
    _.pick(req.body, [
      "name",
      "vendor",
      "owner",
      "startDate",
      "endDate",
      "description"
    ])
  );
  await project.save();
  res.json({
    status: "success"
  });
}

export async function getProjects(req, res) {
  const project = await Project.find().populate("owner");
  res.json(project);
}

export async function getProject(req, res) {
  const project = await Project.findById(req.params.id);
  if (!project) res.status(404).send("No project with given ID exists");
  res.status(200).send(project);
}

export async function getMyProjects(req, res) {
  const project = await Project.findById(req.user.id);
  if (!project) res.status(404).send("No project with given ID exists");
  res.status(200).send(project);
}

export async function deleteProject(req, res) {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project)
    res.status(404).send("The project with the given id does not exist");
  const tasks = await Task.remove({
    project: req.params.id
  });
  if (!tasks) res.status(404).send("Project has no task");
  res.send(project);
}

export async function editProject(req, res) {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body, [
      "name",
      "vendor",
      "owner",
      "startDate",
      "endDate",
      "description"
    ])
  );
  if (!project)
    res.status(404).send("The project with the given id does not exist");
  res.send(project);
}
