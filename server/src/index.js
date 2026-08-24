import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cloudinary from "./config/cloudinary.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { env } from "./config/env.js";
import dns from "node:dns";

// route imports
import authRouter from "./routes/auth.routes.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
app.set("trust proxy", 1);

// middlewares
app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));

// webhook route before parsing

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.get("/", (req, res) => res.json({ message: "API running" }));
app.use("/api/auth", authRouter);

// error handler
app.use(errorHandler);

const PORT = env.PORT;
const start = async () => {
  await connectDB();
  cloudinary.config();
  app.listen(PORT, () => {
    console.log(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
  });
};

// start
start();
