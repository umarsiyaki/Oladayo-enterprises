
  
   
   
import React from 'react';

const Modal = ({ closeModal }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Implement logic to add cashier (POST request to backend)
        // Close modal after submission
        closeModal();
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                {/* Form fields for cashier details */}
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="text" placeholder="Phone Number" />
                <input type="text" placeholder="Address" />
                <input type="password" placeholder="Password" />
                <button type="submit">Add Cashier</button>
            </form>
        </div>
    );
};



import React, { useState } from 'react';
import Modal from './Modal'; // Create a modal component for adding cashiers

const AdminDashboard = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <button onClick={openModal}>Add Cashier</button>
            {showModal && <Modal closeModal={closeModal} />}
        </div>
    );
};
export default AdminDashboard;



// routes/admin.js

const express = require('express');

// POST route to add new cashier
router.post('/addCashier', (req, res) => {
    // Retrieve data from request body
    const { username, email, phoneNumber, address, password } = req.body;
    // Implement logic to add cashier to database or perform necessary actions
    // Send response back to frontend (success/failure message)
    res.send('Cashier added successfully');
});

module.exports = router;


// Example route to update product details
router.put('/updateProduct/:productId', (req, res) => {
    const productId = req.params.productId;
    const { name, size, category, price, quantity } = req.body;

    // Implement logic to update product in database
    Product.findByIdAndUpdate(productId, { name, size, category, price, quantity }, { new: true })
        .then(updatedProduct => {
            res.json(updatedProduct);
        })
        .catch(error => {
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});


const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // Assuming you have a Message model

// Get all messages
router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Post a new message
router.post('/messages', async (req, res) => {
    try {
        const { content } = req.body;
        const newMessage = new Message({ content, createdAt: new Date() });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a message
router.delete('/messages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;