import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import BankApp from './BankApp';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} > </Route>
          <Route path="/" element={<BankApp />}> </Route>
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App