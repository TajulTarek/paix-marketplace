const express = require('express');
const { Bank, User } = require('../models/model');

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


// Check Secret Key and Account Number
router.get('/secret/:key/:accountNumber', async (req, res) => {
  try {
    const { key, accountNumber } = req.params;

    // Validate input
    if (!key || !accountNumber) {
      return res.status(400).json({ message: 'Missing required parameters: secret key and account number' });
    }

    // Find bank by secret key and account number
    const bank = await Bank.findOne({ secret_key: key, account_number: accountNumber });

    if (bank) {
      res.status(200).json({ message: 'Valid bank details' }); // Indicate successful verification
    } else {
      res.status(401).json({ message: 'Invalid bank details' }); // Use 401 for unauthorized access
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add Bank Details to User Route
router.post('/addDetails/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { account_number, secret_key } = req.body;

    // Check if bank account with the given account number exists
    const existingBank = await Bank.findOne({ account_number });
    if (!existingBank) {
      return res.status(400).json({ message: 'Bank account not found' });
    }

    // Check if the provided secret key matches the bank record
    if (existingBank.secret_key !== secret_key) {
      return res.status(400).json({ message: 'Invalid secret key' });
    }

    // Update user's account_number
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { account_number: existingBank.account_number, isAdd: true }, 
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }



    res.status(200).json({ message: 'Bank details added to user successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;