import express from "express";

import {
  addToCart,
  increaseProduct,
  decreaseProduct,
  getProductsInCart,
  removeProduct,
  updateCart,
} from "../app/Controllers/CartController.js";
import { verifyToken } from "../utils/verify.js";
const router = express.Router();

router.get("/", verifyToken, getProductsInCart);
router.post("/update", verifyToken, updateCart);
router.post("/add", verifyToken, addToCart);
router.post("/remove", verifyToken, removeProduct);
router.post("/increase", verifyToken, increaseProduct);
router.post("/decrease", verifyToken, decreaseProduct);

export default router;
