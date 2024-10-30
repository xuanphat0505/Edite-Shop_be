import express from "express";
import { createMessage } from "../app/Controllers/MessageController.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.post("/", verifyToken, createMessage);

export default router;
