const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createMessage = async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ msg: "All fields are required" });

  try {
    const newMessage = await Message.create({ name, email, phone, message });
    res.status(201).json({ msg: "Message sent", message: newMessage });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Message deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
