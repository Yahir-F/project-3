import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Gamepage from './pages/Gamepage'
import { Box } from '@mui/system'

function Main() {
  return (
    <Router>
        <Box sx={{position: 'relative', minHeight:'97vh'}}>
        <Header/>
        <Box sx={{paddingBottom:'2.5rem'}}>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/game' element={<Gamepage/>}/>
        </Routes>
        </Box>
        <Footer/>
        </Box>
    </Router>
  )
}

export default Main