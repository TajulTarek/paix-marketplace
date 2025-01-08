const express = require('express');
const { Bank } = require('../models/model');

const router = express.Router();

// Add Bank Route
router.post('/add', async (req, res) => {
  try {
    const { name, account_number, secret_key } = req.body;

    const newBank = new Bank({ 
      name, 
      account_number, 
      secret_key 
    });

    const savedBank = await newBank.save();

    res.status(201).json({ message: 'Bank added successfully', bank: savedBank });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;