const mongoose = require('mongoose');

const CashierSchema = new mongoose.Schema({
    username: String,
    email: String,
    phoneNumber: String,
    address: String,
    password: String
});

const Cashier = mongoose.model('Cashier', CashierSchema);

module.exports = Cashier;