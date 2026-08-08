# Task Manager API

A simple REST API for managing tasks built with Node.js, Express, TypeScript, and MongoDB.

## Features

- Create, read, update, and delete tasks
- Validate task input
- Persist task data in MongoDB
- Clean route-based structure with controllers, services, and models

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- pnpm

## Project Structure

```text
src/
  app.ts               # Express app setup and root route
  server.ts            # Server entry point and DB connection
  config/
    db.ts              # MongoDB connection logic
  controllers/
    task.controller.ts # HTTP request handlers
  models/
    task.model.ts      # Mongoose task schema
  routes/
    task.routes.ts     # Task API routes
  services/
    task.service.ts    # Business logic and database operations
```

## Prerequisites

- Node.js (recommended: 18 or newer)
- pnpm
- A running MongoDB instance

## Installation

1. Clone the project
2. Install dependencies:

```bash
pnpm install
```

## Environment Variables

Create a `.env` file in the project root with the following variable:

```env
MONGO_URI=mongodb://localhost:27017/taskManagerDB
PORT=5070
```

If you are using a different MongoDB connection string, replace it accordingly.

## Running the Application

### Development mode

```bash
pnpm dev
```

The server will start on:

```text
http://localhost:5070
```

### Production build

```bash
pnpm build
pnpm start
```

## API Endpoints

### Get all tasks

```http
GET /tasks
```

### Get a task by ID

```http
GET /tasks/:id
```

### Create a task

```http
POST /tasks
Content-Type: application/json
```

Example body:

```json
{
  "title": "Buy groceries",
  "completed": false
}
```

### Update a task

```http
PATCH /tasks/:id
Content-Type: application/json
```

Example body:

```json
{
  "title": "Buy groceries tomorrow",
  "completed": true
}
```

### Delete a task

```http
DELETE /tasks/:id
```

## Example Response

```json
{
  "success": true,
  "data": {
    "_id": "64f2b7f4b9d2a1c3e4f5a6b7",
    "title": "Buy groceries",
    "completed": false,
    "createdAt": "2026-08-08T00:00:00.000Z",
    "updatedAt": "2026-08-08T00:00:00.000Z"
  }
}
```

## Available Scripts

```bash
pnpm dev      # run in development mode with file watching
pnpm build    # compile TypeScript to JavaScript
pnpm start    # run the compiled server
pnpm typecheck # run TypeScript checks without emitting files
```

## Notes

- The API uses a simple task schema with a required `title` field and an optional `completed` status.
- If the database connection fails, the server exits with an error.
