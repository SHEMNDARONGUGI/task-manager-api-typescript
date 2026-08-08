import { Task } from "../models/task.model.js";

interface CreateTaskData {
  title: string;
  completed: boolean;
}

interface UpdateTaskData {
  title?: string;
  completed?: boolean;
}

export const getAllTasksService = async () => {
  return await Task.find();
};

export const getTaskByIdService = async (id: string) => {
  return await Task.findById(id);
};

export const createTaskService = async (data: CreateTaskData) => {
  return await Task.create(data);
};

export const updateTaskService = async (id: string, data: UpdateTaskData) => {
  return await Task.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteTaskService = async (id: string) => {
  return await Task.findByIdAndDelete(id);
};
