import CompareModel from "../Models/CompareModel.js";
import ProductModel from "../Models/ProductModel.js";

export const addToCompare = async (req, res) => {
  const userId = req.user._id;
  const productId = req.body.productId;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const compareProducts = await CompareModel.findOne({ userId: userId });
    
    if (!compareProducts) {
      const newcompareProducts = new CompareModel({
        userId,
        compareList: [productId],
      });
      await newcompareProducts.save();
      return res.status(200).json({
        success: true,
        message: "Add success",
        data: newcompareProducts,
      });
    }
    if (compareProducts.compareList.includes(productId)) {
      return res.status(400).json({
        success: false,
        message: "Product already in compare",
        data: compareProducts,
      });
    }
    compareProducts.compareList.push(productId);
    await compareProducts.save();

    return res
      .status(200)
      .json({ success: true, message: "Add success", data: compareProducts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export const clearCompare = async (req, res) => {
  const userId = req.user._id;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const compareProducts = await CompareModel.findOne({ userId: userId });
    if (!compareProducts) {
      return res.status(400).json({
        success: false,
        message: "The compare not found",
      });
    }
    compareProducts.compareList = [];
    await compareProducts.save();
    return res.status(200).json({
      success: true,
      message: "Clear the compare success",
      data: compareProducts,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export const removeCompare = async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.productId;
  
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const compareProducts = await CompareModel.findOne({ userId: userId });
    if (!compareProducts) {
      return res.status(400).json({
        success: true,
        message: "The compare not found",
      });
    }
    const compareIndex = compareProducts.compareList.findIndex(
      (product) => product._id.toString() === productId
    );
    if (compareIndex === -1) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    compareProducts.compareList.splice(compareIndex, 1);
    await compareProducts.save();
    return res.status(200).json({ success: true, data: compareProducts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export const isInCompare = async (req, res) => {
  const userId = req.user._id;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const compareProducts = await CompareModel.findOne({
      userId: userId,
    });
    if (!compareProducts) {
      return res.status(400).json({
        success: true,
        message: "The compare not found",
      });
    }
    return res
      .status(200)
      .json({ success: true, data: compareProducts.compareList });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export const getALlFavoriteCompare = async (req, res) => {
  const userId = req.user._id;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const compareProducts = await CompareModel.findOne({
      userId: userId,
    }).populate({ path: "compareList", model: "products" });
    if (!compareProducts) {
      return res.status(400).json({
        success: true,
        message: "The compare not found",
      });
    }
    return res
      .status(200)
      .json({ success: true, data: compareProducts.compareList });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
