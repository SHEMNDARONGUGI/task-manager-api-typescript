import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB Connectes Successfully");
  } catch (error) {
    console.error("Database connection failed!");
    process.exit(1);
  }
};
