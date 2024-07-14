
const sequelize = require('./config/database');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');
    process.exit(0);
  } catch (error) {
    console.error('Error synchronizing database:', error);
    process.exit(1);
  }
})();