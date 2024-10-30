import expres from "express";
import {
  addToCompare,
  removeCompare,
  clearCompare,
  getALlFavoriteCompare,
  isInCompare
} from "../app/Controllers/CompareController.js";
import { verifyToken } from "../utils/verify.js";

const router = expres.Router();
router.get("/", verifyToken ,isInCompare);
router.get("/get", verifyToken ,getALlFavoriteCompare);
router.delete("/clear", verifyToken ,clearCompare);
router.post("/add", verifyToken ,addToCompare);
router.delete("/remove/:productId", verifyToken ,removeCompare);

export default router;
