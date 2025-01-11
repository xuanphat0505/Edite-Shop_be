import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";

import UserModel from "../Models/UserModel.js";
dotenv.config();

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_ACCESSTOKEN_KEY,
    { expiresIn: "60s" }
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_REFRESHTOKEN_KEY,
    { expiresIn: "365d" }
  );
};

export const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const email = req.body.email;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email has been used !!" });
    }
    const newUser = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: email,
      password: hash,
    });
    await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "Register Success", data: newUser });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const checkedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkedPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorect password" });
    }
    const { password, role, ...rest } = user._doc;
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      path: "/",
    });
    res.status(200).json({
      success: true,
      message: "Login success",
      data: { ...rest, accessToken },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export const logout = async (req, res) => {
  const userId = req.user._id;
  try {
    if (!userId) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).json({ success: true, message: "Logout success" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  try {
    // check refresh token
    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "You're not authenticated" });
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN_KEY, (err, user) => {
      if (err) {
        return res
          .status(404)
          .json({ success: false, message: "Refreshtoken is invalid" });
      }

      //  sign new refresh token and access token
      const newRefreshToken = generateRefreshToken(user);
      const newAccessToken = generateAccessToken(user);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        path: "/",
      });
      res.status(200).json({ success: true, accessToken: newAccessToken });
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

export const googleLogin = async (req, res) => {
  const { code } = req.body;
  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "postmessage",
      grant_type: "authorization_code",
    });
    const { id_token } = response.data;
    const userDecoded = jwt.decode(id_token);
    if (!userDecoded) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    let user = await UserModel.findOne({ email: userDecoded.email });

    if (user && user.password) {
      return res
        .status(400)
        .json({ success: false, message: "Email has been used" });
    }
    if (!user) {
      user = new UserModel({
        googleId: userDecoded.sub,
        email: userDecoded.email,
        firstName: userDecoded.family_name,
        lastName: userDecoded.given_name,
        subscribe: false,
        recentViewedProducts: [],
        cart: [],
        note: "",
        role: "user",
        password: null,
      });
      await user.save();
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const { password, role, ...rest } = user._doc;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Login Success",
      data: { ...rest, accessToken },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
