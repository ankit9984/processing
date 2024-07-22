import React, { useState } from 'react';
import { FaLandmark, FaBuilding, FaArchway, FaCity } from 'react-icons/fa';

const CitySelector = () => {
  const [selectedCity, setSelectedCity] = useState('New Delhi');

  const cities = [
    { name: 'New Delhi', icon: <FaLandmark /> },
    { name: 'Gurgaon', icon: <FaBuilding /> },
    { name: 'Noida', icon: <FaArchway /> },
    { name: 'Mumbai', icon: <FaCity /> },
  ];

  return (
    <div className="flex space-x-4 p-4">
      {cities.map((city) => (
        <div
          key={city.name}
          className={`flex flex-col items-center p-4 cursor-pointer border rounded-md ${
            selectedCity === city.name ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
          }`}
          onClick={() => setSelectedCity(city.name)}
        >
          <div className={`text-2xl ${selectedCity === city.name ? 'text-blue-500' : 'text-gray-500'}`}>
            {city.icon}
          </div>
          <div className={`mt-2 ${selectedCity === city.name ? 'text-blue-500' : 'text-gray-700'}`}>
            {city.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CitySelector;
