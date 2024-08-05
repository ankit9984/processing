import React from 'react'
import Navbar from './components/common/Navbar'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage/HomePage'
import CollegePageInfo from './pages/CollegePage/CollegePageInfo'
import CollegeCourse from './components/CollegeInfoComponent/CollegeCourse&Fee'
import QueryPage from './pages/FilterPage/QueryPage'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/college/:slug/' element={<CollegePageInfo/>} />
        <Route path='/college' element={<QueryPage/>} />
        {/* <Route path='/college/:slug/course-fees' element={<CollegeCourse/>} /> */}
      </Routes>
    </div>
  )
}

export default App
