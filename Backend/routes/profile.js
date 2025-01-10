const express = require('express');
const { SupplierProduct, Transaction, User, Bank } = require('../models/model');

const router = express.Router();

// Get Supplier Products for Specific Supplier
router.get('/supplier/:supplierId', async (req, res) => {
  try {
    const { supplierId } = req.params;
    const supplierProducts = await SupplierProduct.find({ supplier_id: supplierId });

    if (!supplierProducts || supplierProducts.length === 0) {
      return res.status(404).json({ message: 'No products found for this supplier' });
    }

    res.status(200).json({ supplierProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get Supplier Products for Specific User
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const supplierProducts = await SupplierProduct.find({ user_id: userId });

    if (!supplierProducts || supplierProducts.length === 0) {
      return res.status(404).json({ message: 'No products found for this user' });
    }

    res.status(200).json({ supplierProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Verify Supplier Product by Supplier Product ID
router.put('/verify/:supplierProductId', async (req, res) => {
  try {
    const { supplierProductId } = req.params;
    const supplierProduct = await SupplierProduct.findById(supplierProductId);
    const supplier = await User.findById(supplierProduct.supplier_id);
    const supplierAccount = await Bank.findOne({ account_number: supplier.account_number });
    const adminAccount = await Bank.findOne({ account_number: "1234567892" });

    if (!supplierProduct) {
      return res.status(404).json({ message: 'Supplier product not found' });
    }

    supplierProduct.isVerified = true;
    await supplierProduct.save();

    adminAccount.amount -= supplierProduct.product_credit;
    await adminAccount.save();

    supplierAccount.amount += supplierProduct.product_credit;
    await supplierAccount.save();

    res.status(200).json({ message: 'Supplier product verified successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;