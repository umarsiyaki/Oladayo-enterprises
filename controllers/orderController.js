const { Order, Product, User } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;
    const order = await Order.create({
      userId: req.user.id,
      totalAmount,
      status: 'pending',
    });

    await order.addProducts(products.map(product => ({ ...product, orderId: order.id })));

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [User, Product] });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: [User, Product] });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.update({ status: req.body.status });
    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};