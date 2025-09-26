import dotenv from "dotenv";
import "./utils/logger"; // must be first to hook console
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import newsRoutes from "./routes/newsRoutes";
import imagesRoutes from "./routes/imagesRoutes";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(express.json());

// Simple health check to confirm the server is running
app.get("/", (_req, res) => {
  res.send("Server is running");
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/news", newsRoutes);
app.use("/images", imagesRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }
);

app.listen(port, () => {
  console.log(process.env.PROJECT_TITLE);
  console.log(process.env.VERSION);
  console.log(process.env.AUTHER);
  console.log(process.env.RELEASED_DATE);
  console.log(`SERVER PORT: ${port}`);
  console.log(`-----------------------------`);
  console.log();
});
