
const express = require('express');
const router = express.Router();
const { User } = require('../models/database');

router.post('/user/add', async (req, res) => {
    const { role, username, email, phone, address, password, firstname, middlename, surname } = req.body;

    try {
        // Create a new user instance
        const newUser = new User({
            role,
            username,
            email,
            phone,
            address,
            password,
            firstname,
            middlename,
            surname,
        });

        // Save user to the database
        await newUser.save();
        res.json({ success: true, message: `${role} added successfully.` });
    } catch (error) {
        res.json({ success: false, message: 'Error adding user.' });
    }
});

module.exports = router;