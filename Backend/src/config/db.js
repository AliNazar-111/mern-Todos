import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URI);
    console.log("connected");
  } catch (error) {
    console.log("Not Connected", error);
  }
};
