import { Request, Response, Router } from 'express';
import { Task } from '../models';

const createTask = async (req: Request, res: Response) => {
  const userId = req.currentUser!.id;
  const { name, description } = req.body;

  const task = Task.build({
    name,
    description,
    done: false,
    userId,
  });
  await task.save();

  res.send(req.currentUser);
};

interface UpdateTaskData {
  name?: string;
  description?: string;
  done?: boolean;
}

const updateTask = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id;
  const taskId = req.params.taskId;
  const { name, description, done } = req.body;

  const data: UpdateTaskData = {};
  if (name) data.name = name;
  if (description) data.description = description;
  if (done) data.done = done;

  const task = await Task.findOneAndUpdate({ _id: taskId, userId }, data, {
    new: true,
  });
  res.send(task);
};

const deleteTask = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id;
  const taskId = req.params.taskId;

  const task = await Task.findOneAndDelete({ _id: taskId, userId });
  res.send({ message: 'Succesfully deleted', task });
};

const getTask = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id;
  const taskId = req.params.taskId;

  const task = await Task.findOne({ _id: taskId, userId });
  res.send(task);
};

const getTasks = async (req: Request, res: Response) => {
  const user = req.currentUser;

  const tasks = await Task.find({ userId: user?.id });
  res.send(tasks);
};

export default {
  createTask,
  updateTask,
  deleteTask,
  getTask,
  getTasks,
};
