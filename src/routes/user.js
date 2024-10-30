import express from "express";
import {
  resetPassword,
  changePassword,
  subscribeEmail,
} from "../app/Controllers/UserController.js";

import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.post("/reset", resetPassword);
router.post("/change", changePassword);
router.post("/subcribe", verifyToken, subscribeEmail);

export default router;
