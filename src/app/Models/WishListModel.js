import mongoose from "mongoose";

const WishListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  products: [
    { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
  ],
});

const WishListModel = mongoose.model("wishLists", WishListSchema);
export default WishListModel;
