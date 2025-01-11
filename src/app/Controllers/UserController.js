import crypto from "crypto";
import bcrypt from "bcryptjs";
import UserModel from "../Models/UserModel.js";
import { mailService } from "../../services/MailService.js";

export const getNewUsers = async (req, res) => {
  const days = parseInt(req.query.days) || 7;
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const users = await UserModel.find({ createdAt: { $gte: startDate } });
    return res.status(200).json({ success: true, newUser: users.length });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res
      .status(200)
      .json({ success: true, users: users, count: users.length });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found!" });
    }
    // make a random password
    const randomPassword = crypto.randomBytes(8).toString("hex");

    // hash password
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    // update the user's password in the database
    user.password = hashedPassword;
    await user.save();
    await mailService({
      email: email,
      subject: "Password Reset",
      html: `<p>Your new password is: <b style="color:blue">${randomPassword}</b>. Please don't send it to anyone !! </p>`,
    });

    return res.status(200).json({
      success: true,
      message: "Please check your email. Password has been sent to your email",
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
export const changePassword = async (req, res) => {
  const { newPassword, repeatPassword, email } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    }
    if (newPassword !== repeatPassword) {
      return res.status(401).json({
        success: false,
        message: "The password doesn't match. Please re-enter password",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // update the new password
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password has been changed" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
export const subscribeEmail = async (req, res) => {
  const userId = req.user._id;
  const { email } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!userId && !user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // compare email
    if (email !== user.email) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }
    user.subscribe = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "subscribe success",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
