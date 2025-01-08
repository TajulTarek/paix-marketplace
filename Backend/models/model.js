const mongoose = require('mongoose');

// User Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user_type: { 
    type: String, 
    enum: ['buyer', 'supplier', 'bank', 'admin'], 
    required: true 
  },
  account_number: { type: String },
  address: [{ type: String }] 
});

const User = mongoose.model('User', userSchema);

// Bank Model
const bankSchema = new mongoose.Schema({
  name: { type: String, required: true },
  account_number: { type: String, required: true, unique: true },
  secret_key: { type: String, required: true }
});

const Bank = mongoose.model('Bank', bankSchema);

// Product Model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  supplier_id: { type: String, required: true },
  supplier_name: { type: String, required: true },
  price: { type: Number, required: true }, 
  originalPrice: { type: Number },  
  image: { type: String } // Store image URL as a string
});

const Product = mongoose.model('Product', productSchema);

// Cart Model
const cartSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  product_id: { type: String, required: true },
  product_name: { type: String, required: true },
  supplier_id: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 }
});

const Cart = mongoose.model('Cart', cartSchema);

// Transaction Model
const transactionSchema = new mongoose.Schema({
  sender_account_number: { type: String, required: true },
  receiver_account_number: { type: String, required: true },
  product_credit: { type: Number, required: true }, 
  shipping_credit: { type: Number },
  total_credit: { type: Number, required: true },
  products_list: [{ 
    product_name: { type: String, required: true },
    product_id: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  address: { type: String }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Supplier Product Model
const supplierProductSchema = new mongoose.Schema({
  supplier_id: { type: String, required: true },
  user_id: { type: String, required: true }, 
  tran_url: { type: String }, 
  product_list: [{ 
    product_name: { type: String, required: true },
    product_id: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  isVerified: { type: Boolean, default: false },
  product_credit: { type: Number } 
});

const SupplierProduct = mongoose.model('SupplierProduct', supplierProductSchema);

module.exports = { User, Bank, Product, Cart, Transaction, SupplierProduct };