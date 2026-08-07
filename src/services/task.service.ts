import { tasks } from "../data/tasks.js";

interface CreateTaskData {
  title: string;
  completed: boolean;
}

interface UpdateTaskData {
  title?: string;
  completed?: boolean;
}

export const getAllTasksService = () => {
  return tasks;
};

export const getTaskByIdService = (id: number) => {
  return tasks.find((task) => task.id === id);
};

export const createTaskService = (data: CreateTaskData) => {
  const { title, completed } = data;
  const newTask = {
    id: tasks.length + 1,
    title,
    completed,
  };

  tasks.push(newTask);

  return newTask;
};

export const updateTaskService = (id: number, data: UpdateTaskData) => {
  const { title, completed } = data;

  const task = tasks.find((task) => task.id === id);
  if (!task) return null;

  if (title !== undefined) {
    task.title = title;
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  return task;
};

export const deleteTaskService = (id: number): boolean => {
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return false;
  }

  tasks.splice(taskIndex, 1);

  return true;
};
