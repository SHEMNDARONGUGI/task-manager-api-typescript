import { tasks } from "../data/tasks.js";

export const getAllTasksService = () => {
  return tasks;
};

export const getTaskByIdService = (id: number) => {
  return tasks.find((task) => task.id === id);
};

export const createTaskService = (title: string, completed: boolean) => {
  const newTask = {
    id: tasks.length + 1,
    title,
    completed,
  };

  tasks.push(newTask);

  return newTask;
};

export const updateTaskService = () => {};
export const deleteTaskService = () => {};
