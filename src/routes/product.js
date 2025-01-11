import express from "express";
import {
  getProducts,
  getFilterProducts,
  getProductCount,
  getProductBySearch,
  getProductDetail,
  addRecentlyViewedProduct,
  getRecentlyProduct,
  getCategoyDitribution,
} from "../app/Controllers/ProductControllers.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.get("/filter", getFilterProducts);
router.get("/count", getProductCount);
router.get("/search", getProductBySearch);
router.get("/recently", verifyToken, getRecentlyProduct);
router.get("/category-ditribution", getCategoyDitribution);
router.post("/recently/:productId", verifyToken, addRecentlyViewedProduct);

router.get("/", getProducts);
router.get("/:id", getProductDetail);

export default router;
