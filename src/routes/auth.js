import express from "express";
import {
  register,
  login,
  refreshToken,
  logout,
  googleLogin
} from "../app/Controllers/AuthController.js";

import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/refreshToken", refreshToken);
router.post("/logout", verifyToken, logout);

export default router;
