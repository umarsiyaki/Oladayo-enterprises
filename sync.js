const sequelize = require('./config/database');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const initialData = require('./config/initialData');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');

    // Seed initial data
    await seedInitialData();

    console.log('Initial data seeded');
    process.exit(0);
  } catch (error) {
    console.error('Error synchronizing database:', error);
    process.exit(1);
  }
})();

async function seedInitialData() {
  try {
    // Seed users
    for (const userData of initialData.users) {
      await User.create(userData);
    }

    // Seed products
    for (const productData of initialData.products) {
      await Product.create(productData);
    }

    // Seed orders
    for (const orderData of initialData.orders) {
      await Order.create(orderData);
    }

    console.log('Seeding initial data completed');
  } catch (error) {
    console.error('Error seeding initial data:', error);
    throw error;
  }
}

// Simulate some server requests for demonstration
async function performServerRequests() {
  try {
    // Fetch all users
    const users = await User.findAll();
    console.log('Users:', users);

    // Fetch all products
    const products = await Product.findAll();
    console.log('Products:', products);

    // Fetch all orders
    const orders = await Order.findAll();
    console.log('Orders:', orders);

    // Create a new product
    const newProduct = await Product.create({
      name: 'Sample Product',
      category: 'Sample Category',
      size: 'M',
      quantity: 100,
      price: 20.0,
    });
    console.log('New product created:', newProduct);

    // Update a product
    const updatedProduct = await Product.update(
      { price: 25.0 },
      { where: { id: newProduct.id } }
    );
    console.log('Product updated:', updatedProduct);

    // Delete a product
    const deletedProduct = await Product.destroy({ where: { id: newProduct.id } });
    console.log('Product deleted:', deletedProduct);

    console.log('Server requests performed successfully');
  } catch (error) {
    console.error('Error performing server requests:', error);
    throw error;
  }
}

// Execute server requests for demonstration
(async () => {
  try {
    await performServerRequests();
    process.exit(0);
  } catch (error) {
    console.error('Error in server request execution:', error);
    process.exit(1);
  }
})();
