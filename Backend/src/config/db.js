import mongoose from "mongoose";

export const connectDB = async () => {
  // <--- Ensure 'export' is here
  try {
    // Ensure process.env.Mongo_URI is defined
    if (!process.env.Mongo_URI) {
      throw new Error("Mongo_URI environment variable is not defined.");
    }
    await mongoose.connect(process.env.Mongo_URI);
    console.log("connected");
  } catch (error) {
    console.log("Not Connected", error);
  }
};
