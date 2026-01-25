import Message from "../models/message.model.js";

export const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({ message: "Fill up required fields" });

    await Message.create({ name, email, subject, message });

    return res.status(201).json({
      message: "Message received successfully",
    });
  } catch (err) {
    next(err);
  }
};
