import express from "express";

import { evaluateAnswer } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/", evaluateAnswer);

export default router;
