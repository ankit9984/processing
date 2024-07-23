import React from 'react'
import { FaBuilding, FaCity, FaIndustry, FaLandmark } from 'react-icons/fa';

const cities = [
    { name: 'New Delhi', icon: FaLandmark },
    { name: 'Gurgaon', icon: FaBuilding },
    { name: 'Noida', icon: FaIndustry },
    { name: 'Mumbai', icon: FaCity },
    {name: 'Uttar Pradesh', icon: FaCity}
    // Add more cities here as needed
];

function CitySelector() {
    return (
        <div className="grid  grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-4 p-4">
            {cities.map((city) => (
                <button
                    key={city.name}
                    className="flex flex-col items-center justify-center p-4 border max-w-72 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300 aspect-square"
                >
                    <city.icon className="text-4xl text-blue-500 mb-3" />
                    <span className="text-center sm:text-xl lg:text-3xl text-sm font-medium">{city.name}</span>
                </button>
            ))}
        </div>
    )
}

export default CitySelector