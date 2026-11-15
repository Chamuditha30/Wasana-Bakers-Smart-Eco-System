import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";
import branchRoute from "./routes/branch.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js";
import inventoryRoute from "./routes/inventory.route.js";
import pickupSlotRoute from "./routes/pickupSlot.route.js";
import orderRoute from "./routes/order.route.js";
import paymentRoute from "./routes/payment.route.js";
import expenseRoute from "./routes/expense.route.js";

//initialize app
export const app = express();

//security middleware
app.use(helmet());

//allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
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
app.use("/branch", branchRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/inventory", inventoryRoute);
app.use("/pickup-slot", pickupSlotRoute);
app.use("/order", orderRoute);
app.use("/payment", paymentRoute);
app.use("/expense", expenseRoute);

//error handler
app.use(errorHandler);
