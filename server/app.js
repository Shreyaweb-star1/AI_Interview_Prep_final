import express from "express";
import cors from "cors";

import questionRoutes from "./routes/questionRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "AI Interview Prep Backend is Running ",
  });
});

app.use("/api/questions", questionRoutes);
app.use("/api/feedback", feedbackRoutes);

export default app;