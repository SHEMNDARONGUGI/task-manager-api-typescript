import e from "express";
import express from "express";

// express => creates an express application instance
const app = express();

// GET requests retrieve data
// "/" => route path

// route handler (req, res) => {}

// req(request) => contains information coming from the client e.g URL, Headers, Body, Query parameters
// res(response) => allow us to send something back
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running" });
});

export default app;
