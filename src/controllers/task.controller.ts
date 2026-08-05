import { type Request, type Response } from "express";

import { getAllTasksService } from "../services/task.service.js";

interface CreateTaskBody {
  title: string;
  completed?: boolean;
}

interface UpdateTaskBody {
  title?: string;
  completed?: boolean;
}
let allTasks = getAllTasksService();

export const getAllTasks = (req: Request, res: Response): void => {
  const allTasks = getAllTasksService();

  res.status(200).json({
    success: true,
    count: allTasks.length,
    data: allTasks,
  });
};

export const getTaskById = (req: Request, res: Response): void => {
  const taskId = Number(req.params.id);

  const task = allTasks.find((task) => task.id === taskId);
  if (!task) {
    res.status(404).json({
      success: false,
      message: "Task not found",
    });

    return;
  }

  res.status(200).json({
    success: true,
    data: task,
  });
};

// Request<Params, ResBody, ReqBody>
export const createTask = (
  req: Request<{}, {}, CreateTaskBody>,
  res: Response,
): void => {
  const { title, completed = false } = req.body;

  if (!title || title.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: "Title is required",
    });

    return;
  }

  const newTask = {
    id: allTasks.length + 1,
    title,
    completed,
  };

  allTasks.push(newTask);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: newTask,
  });
};

export const updateTask = (
  req: Request<{ id: string }, {}, UpdateTaskBody>,
  res: Response,
): void => {
  const taskId = Number(req.params.id);

  const task = allTasks.find((task) => task.id === taskId);

  if (!task) {
    res.status(404).json({
      success: false,
      message: "Task not found",
    });
    return;
  }

  const { title, completed } = req.body;

  if (title === undefined && completed === undefined) {
    res.status(400).json({
      success: false,
      message: "Provide at least one field to update.",
    });

    return;
  }

  if (title !== undefined && title.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: "Title cannot be empty.",
    });

    return;
  }

  if (title !== undefined) {
    task.title = title;
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  res.status(200).json({
    success: true,
    message: "Task updated Successfully.",
    data: task,
  });
};

export const deleteTask = (
  req: Request<{ id: string }>,
  res: Response,
): void => {
  const taskId = Number(req.params.id);

  const taskIndex = allTasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({
      success: false,
      message: "Task not found. ",
    });
    return;
  }

  allTasks.splice(taskIndex, 1);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};
