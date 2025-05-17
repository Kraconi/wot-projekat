// import dotenv from "dotenv";
// dotenv.config();
// dotenv.config({
//   path: process.env.NODE_ENV === "docker" ? ".env" : ".env.local",
// });

import { dbconnect } from "./config/database.config.js";
dbconnect();

import express from "express";
import cors from "cors";

import foodRouter from "./routers/food.router.js";
import userRouter from "./routers/user.router.js";
import orderRouter from "./routers/order.router.js";
import { CLIENT_PORT, SERVER_PORT } from "./constants/ports.js";

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:" + CLIENT_PORT,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.listen(SERVER_PORT, () => {
  console.log("Listening on port " + SERVER_PORT);
});
