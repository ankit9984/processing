import React, { useState } from 'react'
import { FaLandmark, FaBuilding, FaArchway, FaCity } from 'react-icons/fa';

function CityComponents() {
    const [selectedCity, setSelectedCity] = useState('Mumbai')

    const cities = [
        { name: 'Mumbai', icon: <FaCity /> },
        { name: 'New Delhi', icon: <FaLandmark /> },
        { name: 'Gurgaon', icon: <FaBuilding /> },
        { name: 'Noida', icon: <FaArchway /> },
    ];

    return (
        <div className='flex justify-center items-center bg-red-50 w-full p-4'>
            <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 w-full max-w-6xl'>
                {cities.map((city) => (
                    <div 
                        key={city.name}
                        className={`flex flex-col justify-between items-center p-4 cursor-pointer border rounded-lg ${
                            selectedCity === city.name ? 'bg-blue-400 border-blue-400' : 'border-gray-300 hover:bg-gray-100'
                        } transition-colors duration-300`}
                        onClick={() => setSelectedCity(city.name)}
                    >
                        <div className='text-5xl sm:text-6xl mb-2'>{city.icon}</div>
                        <p className='text-lg sm:text-xl'>{city.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CityComponents