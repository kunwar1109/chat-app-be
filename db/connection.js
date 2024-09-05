import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.CONNECTION_URI);
    if (connection) {
      console.log("connected to DB successfully");
    }
  } catch (error) {
    console.log("failed to connect", error);
  }
};
