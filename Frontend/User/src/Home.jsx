import React from 'react'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'

import Productlist from './components/Productlist' 

import Footer from './components/Footer'

function Home() {
  return (
      <>
          <Navbar />
          <Carousel />
          <Productlist />
          <Productlist />
          <Footer />
      </>
  )
}

export default Home