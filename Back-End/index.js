import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routes/index.js";
import cookieParser from "cookie-parser";


dotenv.config();
const {  MONGO_URL } = process.env;

const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "*",
    exposedHeaders: ["set-cookie"],
  })
);

mongoose.connect(`${MONGO_URL}`).then(() => console.log("Database Connected!"));
app.use("/api/v1", router);
const POST = 8000; // default POST to listen

// start the Express server
app.listen(POST, () => {
  console.log(`server started at http://localhost:${POST}`);
});

;
