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
                body {
                  font-family: sans-serif;
                }
                h1, h2, h3 {
                  margin: 10px 0;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
                table th, table td {
                  border: 1px solid #ddd;
                  padding: 5px;
                }
              </style>
            </head>
            <body>
              <h1>PAIX Payment Slip</h1>
              <h2>Date: ${new Date().toLocaleString()}</h2>
              <h3>Customer Information:</h3>
              <p>Name: ${user.name}</p>
              <p>Address: ${address}</p>
              <h3>Transaction Details:</h3>
              <p>Transaction ID: ${transaction._id}</p>
              <h3>Products:</h3>
              <table>
                <thead>
                  <tr>
                    <th>P</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${transaction.products_list.map((item, index) => `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${item.product_name}</td>
                      <td>${item.quantity}</td>
                      <td>${item.price}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              <h3>Credit Details:</h3>
              <p>Product Price: ${transaction.product_credit}</p>
              <p>Shipping Fee: ${transaction.shipping_credit}</p>
              <p>Total Price: ${transaction.total_credit}</p>
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