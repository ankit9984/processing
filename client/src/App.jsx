import React from 'react'
import Navbar from './components/common/Navbar'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage/HomePage'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
