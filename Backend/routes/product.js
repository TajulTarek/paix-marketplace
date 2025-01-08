const express = require('express');
const { Product, Cart } = require('../models/model'); 

const router = express.Router();

// Add Product Route
router.post('/add', async (req, res) => {
  try {
    const { name, description, supplier_id, supplier_name, price, originalPrice, image } = req.body;

    const newProduct = new Product({ 
      name, 
      description, 
      supplier_id, 
      supplier_name, 
      price, 
      originalPrice, 
      image 
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get All Products Route
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); 

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get Single Product Route
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id; 
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add to Cart Route
router.post('/addToCart', async (req, res) => {
    try {
      const { user_id, product_id, product_name, supplier_id, price, quantity = 1 } = req.body; 
  
      const existingCartItem = await Cart.findOne({ user_id, product_id });
  
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        await existingCartItem.save();
      } else {
        const newCartItem = new Cart({
          user_id,
          product_id,
          product_name,
          supplier_id,
          price,
          quantity,
        });
  
        await newCartItem.save();
      }
  
      res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;