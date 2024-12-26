const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Registration Route
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Create a new user and store the password as plain text
        const newUser = await userModel.create({
            email,
            username,
            password
        });
        res.json({ message: 'Success' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login Route
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Log the user-entered password
        console.log("User-entered password:", password);

        // Fetch user from the database
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Username or password is incorrect"
            });
        }

        // Log the stored password from the database
        console.log("Stored password from DB:", user.password);

        // Compare the user-entered password directly with the stored password
        if (password !== user.password) {
            return res.status(400).json({
                message: "Username or password is incorrect"
            });
        }

        // If password matches, generate JWT token
        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            username: user.username
        }, process.env.JWT_SECRET);

        // Send a response with the token
     res.render('home')

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
