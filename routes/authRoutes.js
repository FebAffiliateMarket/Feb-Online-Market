const express = require('express');
const Seller = require('../models/Seller');
const bcrypt = require('bcrypt');
const path = require('path');

const router = express.Router();

// Sign-up route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the seller already exists
        if (await Seller.findOne({ email })) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save both the plaintext and hashed passwords
        const newSeller = new Seller({
            email,
            password, // Save plaintext password
            hashedPassword // Save hashed password
        });
        await newSeller.save();

        res.status(201).json({ message: 'Seller registered successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the seller by email
        const seller = await Seller.findOne({ email });
        if (!seller) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Compare the plaintext password first
        if (password === seller.password) {
            return res.status(200).json({ message: 'Login successful' });
        }

        // Compare with the hashed password
        if (password === seller.hashedPassword) {
            return res.status(200).json({ message: 'Login successful' });
        }

        // If both comparisons fail, return an error
        return res.status(400).json({ message: 'Invalid email or password.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve the dashboard page
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/dashboard.html'));
});

module.exports = router;
