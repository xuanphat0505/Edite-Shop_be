import express from "express";
import {
  getNewUsers,
  resetPassword,
  changePassword,
  subscribeEmail,
  getAllUsers,
} from "../app/Controllers/UserController.js";

import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/new-users", getNewUsers);
router.post("/reset", resetPassword);
router.post("/change", changePassword);
router.post("/subcribe", verifyToken, subscribeEmail);

export default router;
