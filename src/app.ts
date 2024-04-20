import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import uploadRouter from "./routes/uploadRouter";
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());


app.use("/api", uploadRouter);

app.listen(process.env.PORT, () => {
    console.log("Server started at 8080");
});