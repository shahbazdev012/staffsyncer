import mongoose, { connection } from "mongoose";

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to MongoDB.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "nextjs",
    });
    console.log("Connected to MongoDB.",connection.host);
  } catch (error) {
    console.error("Failed to connect to MongoDB.", error);
  }
};

export default dbConnect;
