import mongoose from "mongoose";
import { env } from "./env.js";

const dbName = env.NODE_ENV === "development" ? "loam_dev" : "loam_prod";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("DB connected");
    });

    console.log("Connecting to DB", {
      dbName,
      NODE_ENV: env.NODE_ENV,
    });

    await mongoose.connect(env.MONGO_URI, { dbName });
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
