import OrderModel from "../Models/OrderModel.js";

// Tạo đơn hàng mới
export const createOrder = async (req, res) => {
  const userId = req.user._id;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const { products, totalAmount, shippingInfo } = req.body;

    // Kiểm tra thông tin sản phẩm
    if (!products || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng thêm sản phẩm vào đơn hàng",
      });
    }

    // Tạo đơn hàng mới
    const order = await OrderModel.create({
      user: userId, // Lấy từ middleware auth
      products,
      totalAmount,
      shippingInfo,
      status: "processing",
    });

    return res.status(201).json({
      success: true,
      message: "Tạo đơn hàng thành công",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Lấy danh sách đơn hàng của user
export const getUserOrders = async (req, res) => {
  const userId = req.user._id;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const orders = await OrderModel.find({ user: userId })
      .populate("products.productId")
      .populate("paymentInfo")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Lấy chi tiết đơn hàng
export const getOrderDetail = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await OrderModel.findOne({
      _id: orderId,
      user: req.user._id,
    }).populate("products.productId");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Hủy đơn hàng
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await OrderModel.findOne({
      _id: orderId,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    // Chỉ cho phép hủy đơn hàng chưa thanh toán
    if (order.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "Không thể hủy đơn hàng đã thanh toán",
      });
    }

    order.status = "cancelled";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Hủy đơn hàng thành công",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
