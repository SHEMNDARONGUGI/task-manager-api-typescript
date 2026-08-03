import type { Request, Response } from "express";

interface CreateTaskBody {
  title: string;
  completed?: boolean;
}

export const getAllTasks = (req: Request, res: Response): void => {
  console.log(req);
  console.log(res);

  res.status(200).json({
    success: true,
    message: "Get all tasks",
  });
};

export const getTaskById = (req: Request, res: Response): void => {
  const { id } = req.params;

  res.status(200).json({
    success: true,
    message: `Fetching task with ID: ${id}`,
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

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: { title, completed },
  });
};
