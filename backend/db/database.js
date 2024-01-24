import mongoose from "mongoose";

export const connectDB = async (MONGO_URI) => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log("Connected to mongodb: " + conn.connection.host);
  } catch (error) {
    console.error("Error: " + error.message);
    process.exit(1);
  }
};
