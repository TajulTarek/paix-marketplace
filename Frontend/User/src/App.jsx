import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import ShoppingCart from './ShoppingCart';
import Product from './Product';
import Login from './Login';
import Register from './Register';
import MyAccount from './MyAccount';
import MyOrders from './MyOrders';
  
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} > </Route>
          <Route path="/" element={<Home />}> </Route>
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<ShoppingCart />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/myaccount" element={<MyAccount />}></Route>
          <Route path="/myorders" element={<MyOrders />}></Route>
        </Routes>
      </BrowserRouter>
    </>
    
  )
}

export default App