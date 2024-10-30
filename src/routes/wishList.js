import express from "express";

import { verifyToken } from "../utils/verify.js";
import {
  addToWishList,
  removeWishList,
  isProductFavorite,
  getAllFavoriteProduct
} from "../app/Controllers/WishListController.js";

const router = express.Router();

router.get("/", verifyToken, isProductFavorite);
router.get("/products", verifyToken, getAllFavoriteProduct);
router.post("/add", verifyToken, addToWishList);
router.post("/remove", verifyToken, removeWishList);

export default router;
