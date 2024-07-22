import React from 'react'
import Navbar from './components/common/Navbar'
import SearchComponent from './components/HomeCompents/SearchComponent'
import CitySelector from './components/HomeCompents/CityComponents'

function App() {
  return (
    <div>
      <Navbar/>
      <SearchComponent/>
      <CitySelector/>
    </div>
  )
}

export default App
