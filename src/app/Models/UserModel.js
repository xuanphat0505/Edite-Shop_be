import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String, // Add this field to store the Google profile ID
      unique: true,
      sparse: true, // Optional: makes it possible for this field to be null
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: null,
    },
    subscribe: {
      default: false, // Default value for the subscribe field
      type: Boolean,
    },
    recentViewedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    ],
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        colorName: {
          type: "String",
          required: false,
        },
        count: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    note: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
