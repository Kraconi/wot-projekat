import dotenv from 'dotenv'
dotenv.config();

import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router.js";
import userRouter from "./routers/user.router.js";

import { dbconnect } from './config/database.config.js';
dbconnect();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const PORT = 5000;
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
