import ProductModel from "../Models/ProductModel.js";
import UserModel from "../Models/UserModel.js";

export const getProducts = async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : null;
  try {
    let products;
    if (page !== null) {
      products = await ProductModel.find()
        .skip(page * 7)
        .limit(7);
    } else {
      products = await ProductModel.find();
    }
    return res.status(200).json({
      success: true,
      message: "get successful",
      count: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "get failed" });
  }
};

export const getProductDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const productDetail = await ProductModel.find({ _id: id });
    return res
      .status(200)
      .json({ success: true, message: "get successful", data: productDetail });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getFilterProducts = async (req, res) => {
  const { categoryType } = req.query;
  try {
    if (!categoryType || typeof categoryType !== "string") {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid categoryType in the query.",
      });
    }
    const filteredProducts = await ProductModel.find({
      category: {
        $elemMatch: {
          categoryType: categoryType,
        },
      },
    });

    if (filteredProducts.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No products found for this category.",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: filteredProducts,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "get failed", error: error.message });
  }
};

export const getProductCount = async (req, res) => {
  try {
    const count = await ProductModel.estimatedDocumentCount();
    return res.status(200).json({ success: true, data: count });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getProductBySearch = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ message: "Invalid or missing product name" });
    }
    const products = await ProductModel.find({
      name: { $regex: new RegExp(name, "i") },
    });
    if (products.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No products were found matching your selection.",
      });
    }
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const addRecentlyViewedProduct = async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.productId;

  try {
    const user = await UserModel.findById(userId);
    const product = await ProductModel.findById(productId);
    if (!userId && !user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    const index = user.recentViewedProducts.findIndex(
      (id) => id.toString() === productId
    );
    if (index <= -1) {
      //  If not in the list, add it to the beginning
      user.recentViewedProducts.unshift(productId);
    } else {
      // If it's already in the list, move it to the beginning
      user.recentViewedProducts.splice(index, 1);
      user.recentViewedProducts.unshift(productId);
    }
    // if the length >= 4 remove the last product
    if (user.recentViewedProducts.length > 4) {
      user.recentViewedProducts.pop();
    }
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Recently updated product list" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getRecentlyProduct = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await UserModel.findById(userId).populate(
      "recentViewedProducts"
    );
    if (!userId && !user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, data: user.recentViewedProducts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
