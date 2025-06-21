import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    paymentInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payments",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        count: {
          type: Number,
          required: true,
          min: 1,
        },
        colorName: {
          type: String,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingInfo: {
      contact: String,
      country: String,
      address: String,
      city: String,
      firstName: String,
      lastName: String,
      suite: String,
      postalCode: String,
    },
    status: {
      type: String,
      enum: ["processing", "shipping", "completed", "cancelled"],
      default: "processing",
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("orders", OrderSchema);
export default OrderModel;
