import app from "./app.js";

import "dotenv/config";

import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5070;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
