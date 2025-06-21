import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderDetail,
  cancelOrder,
} from "../app/Controllers/OrderController.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

// Tạo đơn hàng mới
router.post("/create", verifyToken, createOrder);

// Lấy danh sách đơn hàng của user
router.get("/",verifyToken, getUserOrders);

// Lấy chi tiết đơn hàng
router.get("/:orderId",verifyToken, getOrderDetail);

// Hủy đơn hàng
router.put("/:orderId/cancel",verifyToken, cancelOrder);

export default router; 