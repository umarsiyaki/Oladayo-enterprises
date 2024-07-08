
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, orderController.createOrder);
router.get('/', authenticate, authorize('admin', 'cashier'), orderController.getAllOrders);
router.get('/:id', authenticate, authorize('admin', 'cashier'), orderController.getOrderById);
router.put('/:id', authenticate, authorize('admin', 'cashier'), orderController.updateOrderStatus);

module.exports = router;