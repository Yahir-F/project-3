import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'

function Main() {
  return (
    <div>
        <Header/>
        CURRENT PAGE
        {/* set up page routes */}
        <Footer/>
    </div>
  )
}

export default Main