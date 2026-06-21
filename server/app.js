import express from "express";

import cors from "cors";

import questionRoutes from "./routes/questionRoutes.js";

import feedbackRoutes from "./routes/feedbackRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/questions", questionRoutes);

app.use("/api/feedback", feedbackRoutes);

export default app;