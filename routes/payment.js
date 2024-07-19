const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Notification = require('../models/Notification');
const Message = require('../models/Message');
const User = require('../models/User');

// Payment route
router.post('/confirm', async (req, res) => {
  const { userId, products, totalAmount, paymentMethod } = req.body;

  try {
    // Create new order
    const newOrder = new Order({ userId, products, totalAmount, paymentMethod });
    await newOrder.save();

    // Update product quantities
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.quantity -= item.quantity;
        await product.save();
      }
    }

    // Notify admin and cashier
    const adminNotification = new Notification({
      userId: 'admin',
      message: `New payment received from user ${userId}`
    });
    await adminNotification.save();

    const cashierNotification = new Notification({
      userId: 'cashier',
      message: `New payment received from user ${userId}`
    });
    await cashierNotification.save();

    // Fetch user details
    const user = await User.findById(userId);
    const userName = user ? user.username : 'Unknown User';

    // Log order details for admin
    console.log(`Order details for admin: User ${userName}, Products: ${JSON.stringify(products)}, Total Amount: ${totalAmount}`);

    // Notify user and cashier
    const userMessage = new Message({
      senderId: 'system',
      receiverId: userId,
      content: `Your payment of ${totalAmount} has been confirmed.`
    });
    await userMessage.save();

    const cashierMessage = new Message({
      senderId: 'system',
      receiverId: 'cashier',
      content: `Payment of ${totalAmount} from user ${userName} has been confirmed.`
    });
    await cashierMessage.save();

    // Send response
    res.json({ success: true, message: 'Payment confirmed', orderId: newOrder._id });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ success: false, message: 'Payment confirmation failed' });
  }
});


const express = require('express');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Notification = require('../models/Notification');
const Message = require('../models/Message');
const User = require('../models/User');

// Confirm payment and create order
router.post('/confirm', async (req, res) => {
  const { userId, products, totalAmount, paymentMethod } = req.body;

  try {
    // Create new order
    const newOrder = new Order({ userId, products, totalAmount, paymentMethod });
    await newOrder.save();

    // Update product quantities
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.quantity -= item.quantity;
        await product.save();
      }
    }

    // Notify user (example)
    const user = await User.findById(userId);
    if (user) {
      const notification = new Notification({
        userId,
        message: `Your order with ID ${newOrder._id} has been placed successfully.`,
        type: 'Order Confirmation'
      });
      await notification.save();

      const message = new Message({
        to: user.email,
        subject: 'Order Confirmation',
        body: `Your order has been confirmed. Order ID: ${newOrder._id}`
      });
      await message.save();
    }

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
