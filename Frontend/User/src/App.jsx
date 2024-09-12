import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import ShoppingCart from './ShoppingCart';
import Product from './Product';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </Router>
    </>
    
  )
}

export default App