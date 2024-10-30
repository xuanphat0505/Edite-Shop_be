import WishListModel from "../Models/WishListModel.js";
import ProductModel from "../Models/ProductModel.js";

export const addToWishList = async (req, res) => {
  const userId = req.user._id;
  const productId = req.body.productId;
  try {
    // check user id
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const product = await ProductModel.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the user's wishlist
    const wishList = await WishListModel.findOne({ userId: userId });
    if (!wishList) {
      const newWishList = new WishListModel({
        userId,
        products: [productId],
      });
      await newWishList.save();

      return res.status(200).json({
        success: true,
        message: "Wishlist created and product added",
      });
    }

    // Check if the product is already in the wishlist
    if (wishList.products.includes(productId)) {
      return res.status(200).json({
        success: false,
        message: "Product already in wishlist",
        data: wishList,
      });
    }

    // Add product to the wishlist
    wishList.products.push(productId);
    await wishList.save();
    return res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      data: wishList,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export const removeWishList = async (req, res) => {
  const userId = req.user._id;
  const productId = req.body.productId;
  try {
    // check user id
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const wishList = await WishListModel.findOne({ userId: userId });
    if (!wishList) {
      return res
        .status(400)
        .json({ success: false, message: "Wish list not found" });
    }

    // find the productId
    const productIndex = wishList.products.findIndex(
      (product) => product._id.toString() === productId
    );
    if (productIndex === -1) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found in wish list" });
    }

    // remove product
    wishList.products.splice(productIndex, 1);
    await wishList.save();
    return res
      .status(200)
      .json({ success: true, message: "Product removed from wishlist" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
export const isProductFavorite = async (req, res) => {
  const userId = req.user._id;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const wishList = await WishListModel.findOne({ userId: userId })
    if (!wishList) {
      return res
        .status(400)
        .json({ success: false, message: "Wish list not found" });
    }
    return res.status(200).json({ success: true, data: wishList.products });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
export const getAllFavoriteProduct = async (req, res) => {
  const userId = req.user?._id;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const wishList = await WishListModel.findOne({ userId: userId }).populate("products")
    if (!wishList) {
      return res
        .status(400)
        .json({ success: false, message: "Wish list not found" });
    }
    return res.status(200).json({ success: true, data: wishList.products });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
