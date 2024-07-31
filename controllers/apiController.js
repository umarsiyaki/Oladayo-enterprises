
const { 
    fetchCashiers, 
    fetchDashboardData, 
    fetchInventoryData, 
    updateOrderStatus, 
    fetchMessages, 
    fetchNotifications, 
    fetchRecentSales, 
    fetchSalesChart, 
    fetchSaleRevenue, 
    fetchTopSellingCategories, 
    fetchCashierPerformance, 
    updateUserSettings 
} = require('../services/apiService');

exports.getCashiers = async (req, res) => {
    try {
        const cashiers = await fetchCashiers();
        res.json(cashiers);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cashiers' });
    }
};

// Similar functions for other endpoints...

exports.updateSettings = async (req, res) => {
    try {
        const settings = req.body;
        await updateUserSettings(settings);
        res.json({ message: 'Settings updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating settings' });
    }
};