
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

router.post('/send', auth, async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  const newMessage = new Message({ sender: senderId, receiver: receiverId, message });

  await newMessage.save();
  res.status(200).send(newMessage);
});

router.get('/messages/:senderId/:receiverId', auth, async (req, res) => {
  const { senderId, receiverId } = req.params;
  const messages = await Message.find({
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId },
    ],
  }).sort({ timestamp: 1 });

  res.status(200).send(messages);
});

module.exports = router;