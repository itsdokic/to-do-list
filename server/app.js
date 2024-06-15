import express from "express";
import cors from "cors";

import taskRoutes from "./routes/taskRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import connectDB from "./database/connectionConfig.js";

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/tasks", taskRoutes);
app.use("/categories", categoryRoutes);

export default app;
