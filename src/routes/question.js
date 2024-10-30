import express from "express";

import { verifyToken } from "../utils/verify.js";
import { createQuestion } from "../app/Controllers/QuestionController.js";

const router = express.Router();

router.post("/", verifyToken, createQuestion);

export default router;
