import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import ShoppingCart from './ShoppingCart';
import Product from './Product';
import Login from './Login';
  
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} > </Route>
          <Route path="/" element={<Home />}> </Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/cart" element={<ShoppingCart/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
    
  )
}

export default App