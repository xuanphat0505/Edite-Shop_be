import UserModel from "../Models/UserModel.js";

export const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, count, colorName } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!userId && !user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const productInCart = user.cart.find(
      (product) => product.productId.toString() === productId
    );
    if (!productInCart) {
      user.cart.push({
        productId: productId,
        count: count,
        colorName: colorName,
      });
    } else {
      productInCart.count = productInCart.count + count;
      productInCart.colorName = colorName;
    }
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: user.cart,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export const increaseProduct = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!userId && !user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const productInCart = user.cart.find(
      (product) => product.productId.toString() === productId
    );
    if (!productInCart) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    } else {
      productInCart.count++;
    }
    await user.save();
    return res.status(200).json({
      success: true,
      data: user.cart,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export const decreaseProduct = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!userId && !user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const productInCart = user.cart.find(
      (product) => product.productId.toString() === productId
    );
    if (!productInCart) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    } else {
      productInCart.count--;
      if (productInCart.count <= 0) {
        user.cart = user.cart.filter(
          (product) => product.productId.toString() !== productId
        );
      }
    }
    await user.save();
    return res.status(200).json({
      success: true,
      data: user.cart,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export const removeProduct = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!userId && !user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const productIndex = user.cart.findIndex(
      (product) => product.productId.toString() === productId
    );
    if (productIndex <= -1) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    user.cart.splice(productIndex, 1);
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Product has beed removed" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export const getProductsInCart = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await UserModel.findById(userId).populate({
      path: "cart.productId",
      model: "products",
    });
    if (!userId && !user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      data: {
        cart: user.cart,
        note: user.note,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export const updateCart = async (req, res) => {
  const userId = req.user._id;
  const { note } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!userId && !user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    user.note = note;
    await user.save();
    return res.status(200).json({ success: true,message:"Update cart successful" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
