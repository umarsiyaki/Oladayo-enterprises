// controllers/CalculatorController.js
const CalculatorController = {
async calculateTotal(req, res) {
try {
const { category, size, quantity } = req.body;
const products = await Product.find({ category, size });
const total = products.reduce((acc, product) => acc + product.price * quantity, 0);
res.json({ total, products });
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Error calculating total' });
}
},
};
