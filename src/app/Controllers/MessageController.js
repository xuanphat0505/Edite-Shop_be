import MessageModel from "../Models/MessageModel.js";

export const createMessage = async (req, res) => {
  try {
    const newMessage = new MessageModel({ ...req.body });
    const savedMessage = await newMessage.save();

    return res
      .status(200)
      .json({
        success: true,
        message: "Send message success",
        data: savedMessage,
      });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
