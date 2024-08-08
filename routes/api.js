
const express = require('express');
const router = express.Router();
const {
    getCashiers,
    getDashboardData,
    getInventoryData,
    confirmOrder,
    getMessages,
    getNotifications,
    getRecentSales,
    getSalesChart,
    getSaleRevenue,
    getTopSellingCategories,
    getCashierPerformance,
    updateSettings
} = require('../controllers/apiController');

// Define routes
router.get('/cashiers', getCashiers);
router.get('/dashboard', getDashboardData);
router.get('/inventory', getInventoryData);
router.post('/orders/:orderId/confirm', confirmOrder);
router.get('/messages', getMessages);
router.get('/notifications', getNotifications);
router.get('/recent-sales', getRecentSales);
router.get('/sales-chart', getSalesChart);
router.get('/sale-revenue', getSaleRevenue);
router.get('/top-selling-categories', getTopSellingCategories);
router.get('/cashier-performance', getCashierPerformance);
router.post('/settings', updateSettings);

module.exports = router;