import React from 'react'
import Navbar from './components/common/Navbar'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage/HomePage'
import CollegePageInfo from './pages/CollegePage/CollegePageInfo'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/college/:slug' element={<CollegePageInfo/>} />
      </Routes>
    </div>
  )
}

export default App
