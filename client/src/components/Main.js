import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Gamepage from './pages/Gamepage'

function Main() {
  return (
    <Router>
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/game' element={<Gamepage/>}/>
        </Routes>
        <Footer/>
    </Router>
  )
}

export default Main