import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./mongodb/db_connection.js";
import userRoutes from "./routes/authRoute.js";
import todoRoutes from "./routes/todoRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("<h1>hello</h1>");
});
app.use("/auth", userRoutes);
app.use("/todo", todoRoutes);

app.listen(3000, () => {
  connectDB();
  console.log("server is on");
});
