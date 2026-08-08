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

export const getAllTasks = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const allTasks = await getAllTasksService();

  res.status(200).json({
    success: true,
    count: allTasks.length,
    data: allTasks,
  });
};

export const getTaskById = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  const taskId = req.params.id;

  const task = await getTaskByIdService(taskId);
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
export const createTask = async (
  req: Request<{}, {}, CreateTaskBody>,
  res: Response,
): Promise<void> => {
  const { title, completed = false } = req.body;

  if (!title || title.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: "Title is required",
    });

    return;
  }

  const newTask = await createTaskService({
    title,
    completed,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: newTask,
  });
};

export const updateTask = async (
  req: Request<{ id: string }, {}, UpdateTaskBody>,
  res: Response,
): Promise<void> => {
  const { title, completed } = req.body;
  const taskId = req.params.id;

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

  const updatedTask = await updateTaskService(taskId, {
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

export const deleteTask = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  const taskId = req.params.id;
  const deletedTask = await deleteTaskService(taskId);

  if (!deletedTask) {
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
