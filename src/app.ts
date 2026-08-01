import e, { response } from "express";
import express from "express";
import { request } from "http";

// express => creates an express application instance
const app = express();

// middleware => Every request passes through middleware before it reaches your route.
app.use(express.json());

// GET requests retrieve data
// "/" => route path

// route handler (req, res) => {}

// req(request) => contains information coming from the client e.g URL, Headers, Body, Query parameters
// res(response) => allow us to send something back
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running" });
});

app.get("/tasks", (req, res) => {
  const tasks = [
    {
      id: 1,
      title: "Learning express with typescript",
      completed: false,
    },
    {
      id: 2,
      title: "Building Task Manager API",
      completed: true,
    },
  ];

  // Why return an object instead of just the array?
  //This is a common API pattern because later we can easily add more information (like pagination or messages) without changing the overall response structure.
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

export default app;
