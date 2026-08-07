import { type Request, type Response } from "express";

import {
  getAllTasksService,
  getTaskByIdService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from "../services/task.service.js";

interface CreateTaskBody {
  title: string;
  completed?: boolean;
}
interface UpdateTaskBody {
  title?: string;
  completed?: boolean;
}

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

  const task = getTaskByIdService(taskId);
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

  const newTask = createTaskService({
    title,
    completed,
  });

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
  const { title, completed } = req.body;
  const taskId = Number(req.params.id);

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

  const updatedTask = updateTaskService(taskId, {
    title,
    completed,
  });

  if (!updatedTask) {
    res.status(404).json({
      success: false,
      message: "Task not found",
    });

    return;
  }

  res.status(200).json({
    success: true,
    message: "Task updated Successfully.",
    data: updatedTask,
  });
};

export const deleteTask = (
  req: Request<{ id: string }>,
  res: Response,
): void => {
  const taskId = Number(req.params.id);
  const deleted = deleteTaskService(taskId);

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: "Task not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};
