   
// Get all messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find(); // Replace with actual database fetch
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Send a new message
exports.sendMessage = async (req, res) => {
    const { content, sender } = req.body;
    try {
        const newMessage = new Message({ content, sender });
        await newMessage.save(); // Replace with actual database save
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const Message = require('../models/message'); // Assuming you have a Message model

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find(); // Replace with your actual database fetch logic
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  const { content, sender } = req.body;
  const message = new Message({ content, sender }); // Replace with your actual database save logic

  try {
    const newMessage = await message.save();
    res.status(201).json({ message: 'Message sent successfully', newMessage });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};