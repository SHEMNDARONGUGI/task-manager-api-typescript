interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export const tasks: Task[] = [
  {
    id: 1,
    title: "Learn TypeScript",
    completed: false,
  },

  {
    id: 2,
    title: "Learn TypeScript with react",
    completed: true,
  },
];
