const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Plaintext password
    hashedPassword: { type: String, required: true } // Hashed password
});

const Seller = mongoose.model('Seller', sellerSchema);
module.exports = Seller;
