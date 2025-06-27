import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// ########## TYPE-SAFE CHECK FOR DB STRING VALUE ##########
const mongoURLLocal = process.env.MONGO_URL_LOCAL;
if (!mongoURLLocal) throw new Error("MONGO_URL_LOCAL is not defined");

// ########## CONNECT TO DB ##########
mongoose.connect(mongoURLLocal);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  app.listen(PORT, () => {
    console.log("server has started at port", PORT);
  });
});

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
