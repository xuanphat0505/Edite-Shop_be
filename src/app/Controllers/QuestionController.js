import QuestionModel from "../Models/QuestionModel.js";

export const createQuestion = async (req, res) => {
  const userId = req.user?._id;
  const { name, phoneNumber, email, message } = req.body;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const newQuestion = new QuestionModel({
      userId:userId,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      message: message,
    });
    await newQuestion.save();

    return res
      .status(200)
      .json({
        success: true,
        message: "Thanks for contacting us. We'll get back to you as soon as possible.",
        data: newQuestion,
      });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
