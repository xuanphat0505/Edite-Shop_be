import express from "express";
import {
  createPayment,
  handlePaymenWithVNPaySuccess,
  handlePaymentWithMomoSuccess,
  getPaymentInfo,
  testAPI,
} from "../app/Controllers/PaymentController.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.post("/create", verifyToken, createPayment);
router.get("/result-vnpay", handlePaymenWithVNPaySuccess);
router.get("/result-momo", handlePaymentWithMomoSuccess);
router.get("/info/:orderId", getPaymentInfo);
router.post("/test", testAPI);


export default router;
