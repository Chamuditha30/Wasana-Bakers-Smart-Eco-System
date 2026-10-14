import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

//initialize app
export const app = express();

//security middleware
app.use(helmet());

//allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://http://localhost:5173",
];

//apply cors
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origin not allowed by CORS"));
      }
    },
  }),
);

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ limit: "3mb", extended: false }));

//routes

//error handler
app.use(errorHandler);
