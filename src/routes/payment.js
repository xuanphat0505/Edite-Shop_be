import express from "express";
import {
  createPayment,
  handlePaymenWithVNPaySuccess,
  handlePaymentWithMomoSuccess,
  getPaymentInfo,
} from "../app/Controllers/PaymentController.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.post("/create", verifyToken, createPayment);
router.get("/result-vnpay", handlePaymenWithVNPaySuccess);
router.get("/result-momo", handlePaymentWithMomoSuccess);
router.get("/info/:orderId", getPaymentInfo);


export default router;
