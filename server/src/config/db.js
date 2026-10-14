import "dotenv/config";
import mongoose from "mongoose";

//get mongo connection string
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/<<<<<collection_name>>>>>";

//function for connect to database
export const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error(`Database not connected \n  ${error.message}`);
    throw new Error("Database not connected");
  }
};
