import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["vnpay", "momo", "credit-card", "cod"],
      required: true,
    },
    transactionId: {
      type: String,
    },
    paymentDate: {
      type: Date,
    },
    responseCode: {
      type: String,
    },
    responseMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("payments", PaymentSchema);
export default Payment;
