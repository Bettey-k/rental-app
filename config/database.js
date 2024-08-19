import mongoose from "mongoose";

let connected = false; // Define the connected variable

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connected = true; // Set the connected flag to true
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    console.log("MongoDB connection failed");
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
