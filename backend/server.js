import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/user.js";
import DbConnect from "./config/dbConfig.js";
import corsOptions from "./cors/cors.js";
import cors from "cors";
import adminRouter from "./routes/adminRoutes.js";
import teamRouter from "./routes/teamRoutes.js";
const PORT = process.env.PORT;

const app = express();
DbConnect();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/user", router);
app.use("/admin", adminRouter);
app.use("/team-member", teamRouter);

app.get("/", (req, res) => {
  res.send("hey there");
});

app.listen(PORT, (req, res) => {
  console.log("listening on PORT", PORT);
});
