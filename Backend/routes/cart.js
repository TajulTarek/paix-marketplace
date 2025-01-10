const express = require('express');
const { Cart, Bank, Transaction, SupplierProduct, User } = require('../models/model');
const jsPDF = require('jspdf'); 
const fs = require('fs');
const path = require('path');
const htmlPdf = require('html-pdf');

const router = express.Router();

// Get All Carts for a User
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const carts = await Cart.find({ user_id: userId });
    res.status(200).json({ carts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a Single Cart Item
router.delete('/:cartId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const deletedCart = await Cart.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Checkout Route
router.post('/checkout', async (req, res) => {
    try {
      const { user_id, address } = req.body;
      const carts = await Cart.find({ user_id });
      const customer = await User.findById(user_id);
      const customerAccount = await Bank.findOne({ account_number: customer.account_number });
      const adminAccount = await Bank.findOne({ account_number: "1234567892" });
  
      if (carts.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }
  
      const transactionsBySupplier = {};
      let totalAmountToAdmin = 0; 
  
      for (const cart of carts) {
        const user = await User.findById(cart.user_id);
        const supplier = await User.findById(cart.supplier_id); // Assuming supplier_id is stored in the user model
        //console.log(user,supplier)
  
        if (!user || !supplier) {
          return res.status(400).json({ message: 'User or supplier not found' });
        }
  
        const senderAccount = await Bank.findOne({ account_number: user.account_number });
        const adminAccount = await Bank.findOne({ account_number: "1234567892" });
        const receiverAccount = await Bank.findOne({ account_number: supplier.account_number }); // Replace with your admin account number

        if (!senderAccount || !receiverAccount) {
          return res.status(400).json({ message: `Bank account not found for user or admin` });
        }
  
        const shippingCredit = 50;
        const productCredit = cart.price * cart.quantity;
        const totalCredit = productCredit + shippingCredit;

        
  
        if (!transactionsBySupplier[supplier._id]) {
          transactionsBySupplier[supplier._id] = {
            sender_account_number: senderAccount.account_number,
            receiver_account_number: receiverAccount.account_number,
            product_credit: productCredit,
            shipping_credit: shippingCredit,
            total_credit: totalCredit,
            products_list: [{
              product_name: cart.product_name,
              product_id: cart.product_id,
              price: cart.price,
              quantity: cart.quantity,
            }],
            address,
          };
        } else {
          transactionsBySupplier[supplier._id].products_list.push({
            product_name: cart.product_name,
            product_id: cart.product_id,
            price: cart.price,
            quantity: cart.quantity,
          });
          transactionsBySupplier[supplier._id].product_credit += productCredit;
          transactionsBySupplier[supplier._id].total_credit += totalCredit;
        }
  
        totalAmountToAdmin += totalCredit;
      }

      if (customerAccount.amount < totalAmountToAdmin){
        return res.status(400).json({ message: 'Shortage of money in your account.', totalAmountToAdmin });
      }

      // Deduct amount from sender's account
      customerAccount.amount -= totalAmountToAdmin;
      await customerAccount.save();

      // Add amount to admin's account
      adminAccount.amount += totalAmountToAdmin;
      await adminAccount.save();

      const transactions = Object.values(transactionsBySupplier);
      //console.log(transactions)
      const tran = await Transaction.insertMany(transactions);
      //console.log(tran)
      // Generate HTML Payslips (one per supplier) and Save Supplier Products
      for (const transaction of tran) {
        const supplier = await User.findOne({ account_number: transaction.receiver_account_number });
        const user = await User.findOne({ account_number: transaction.sender_account_number });
        
        const htmlContent = `
          <!DOCTYPE html>
<html>

<head>
  <title>PAIX Payment Slip</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: sans-serif;
    }

    .invoice-header {
      background-color: #F3F3F3;
      padding: 40px 50px;
      position: relative;
    }

    .invoice-header-title {
      font-size: 36px;
      font-weight: 700;
      color: #FF0901;
      margin-bottom: 20px;
    }

    .invoice-header-title h1 {
      margin: 0;
    }

    .invoice-header-details {
      background: linear-gradient(to bottom, #FF0901, #FF7E03);
      border-radius: 10px;
      padding: 20px 30px;
      position: absolute;
      top: 50%;
      right: 50px;
      transform: translateY(-50%);
      text-align: right;
    }

    .invoice-header-details h2 {
      color: #F3F3F3;
      margin-bottom: 4px;
      font-size: 24px;
    }

    .invoice-header-details h3 {
      color: #fbc6b0;
      font-size: 18px;
    }

    /* Customer and Payment Details */
    .invoice-details {
      background-color: #FF7E03;
      padding: 30px 50px;
      margin: 40px 50px;
      border-radius: 10px;
      color: #fff;
    }

    .invoice-details h3 {
      color: #fff;
      font-size: 24px;
      margin-bottom: 16px;
    }

    .invoice-details h4 {
      color: #f3f3f3;
      font-size: 16px;
      margin-bottom: 8px;
    }

    .invoice-details .customer-info,
    .invoice-details .transaction-info {
      margin-bottom: 24px;
    }

    .invoice-details .customer-info h2 {
      font-size: 22px;
      margin-top: 8px;
    }

    /* Table Style */
    .invoice-products-holder {
      padding: 20px 50px;
      margin-bottom: 50px;
    }

    table {
      border: 1px solid #d7d6d6;
      border-collapse: collapse;
      width: 100%;
      color: #333;
    }

    .table-bold-data {
      font-weight: 600;
    }

    table th {
      padding: 16px 24px;
      background-color: #F3F3F3;
      text-align: left;
      border-bottom: 1px solid #d7d6d6;
    }

    table td {
      padding: 16px 24px;
      border-bottom: 1px solid #d7d6d6;
    }

    table tr:last-child {
      color: #FF7E03;
    }
  </style>
</head>

<body>
  <div class="invoice-header">
    <div class="invoice-header-title">
      <h1>PAIX</h1>
    </div>
    <div class="invoice-header-details">
      <h2>Invoice</h2>
      <h3>Date: ${new Date().toLocaleString()}</h3>
    </div>
  </div>

  <div class="invoice-details">
    <div class="customer-info">
      <h3>Customer</h3>
      <h2>${user.name}</h2>
      <h4>${user.email}</h4>
      <h4>${address}</h4>
    </div>
    <div class="transaction-info">
      <h3>Payment Details</h3>
      <h4>Method: BankPAIX</h4>
      <h4>Status: Paid</h4>
      <h4>Transaction ID: ${transaction._id}</h4>
    </div>
  </div>

  <div class="invoice-products-holder">
    <table>
      <tr>
        <th>NO.</th>
        <th>ITEM DESCRIPTION</th>
        <th>PRICE</th>
        <th>QUANTITY</th>
        <th>AMOUNT</th>
      </tr>
      ${transaction.products_list.map((item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${item.product_name}</td>
          <td>${item.price}</td>
          <td>${item.quantity}</td>
          <td>${item.quantity*item.price}</td>
        </tr>
      `).join('')}
      <tr>
        <td colspan="3"></td>
        <td class="table-bold-data">Sub Total</td>
        <td>${transaction.product_credit}</td>
      </tr>
      <tr>
        <td colspan="3"></td>
        <td class="table-bold-data">Shipping Fee</td>
        <td>${transaction.shipping_credit}</td>
      </tr>
      <tr>
        <td colspan="3"></td>
        <td class="table-bold-data">Grand Total</td>
        <td class="table-bold-data">${transaction.total_credit}</td>
      </tr>
    </table>
  </div>
</body>

</html>

        `;
  
        const pdfPath = path.join(__dirname, '..', 'pdfs', `${transaction._id}.pdf`);
  
        htmlPdf.create(htmlContent, {
          format: 'A4' // Adjust format as needed
        }).toFile(pdfPath, (err) => {
          if (err) {
            console.error('Error generating PDF:', err);
            return res.status(500).json({ message: 'Error generating PDF' });
          }
        });
  
        const supplierProduct = new SupplierProduct({
          supplier_id: supplier._id, // Assuming supplier_id is the same as receiver_account_number
          user_id,
          tran_url: `http://localhost:8000/pdfs/${transaction._id}.pdf`,
          product_list: transaction.products_list,
          product_credit: transaction.product_credit,
        });
  
        await supplierProduct.save();
      }
      await Cart.deleteMany({ user_id }); 
  
      return res.status(201).json({ message: 'Checkout successful', totalAmountToAdmin });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});  
  
module.exports = router;