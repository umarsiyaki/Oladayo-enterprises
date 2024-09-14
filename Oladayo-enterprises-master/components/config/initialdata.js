module.exports = {
    users: [
      { username: 'admin', email: 'admin@example.com', password: 'adminpass', role: 'admin' },
      { username: 'cashier1', email: 'cashier1@example.com', password: 'cashierpass', role: 'cashier' },
      { username: 'user1', email: 'user1@example.com', password: 'userpass', role: 'user' },
    ],
    products: [
      { name: 'Product 1', category: 'Category 1', size: 'S', quantity: 50, price: 10.0 },
      { name: 'Product 2', category: 'Category 2', size: 'M', quantity: 30, price: 15.0 },
    ],
    orders: [
      { userId: 1, productId: 1, quantity: 2, totalPrice: 20.0 },
      { userId: 2, productId: 2, quantity: 1, totalPrice: 15.0 },
    ],
  };
  