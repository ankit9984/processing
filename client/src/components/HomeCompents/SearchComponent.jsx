import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchComponent() {
    const [activeTab, setActiveTab] = useState('Mumbai');
    const tabs = ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Amravati'];

    return (
        <div className='flex justify-center items-center min-h-[18rem] bg-blue-600 p-4'>
            <div className='text-center p-4 sm:p-6 w-full max-w-3xl bg-green-600 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg'>
                <h1 className='mb-4 sm:mb-5 text-xl sm:text-2xl font-bold text-white'>The School Admission Platform, Mumbai</h1>
                <div className='p-2 sm:p-4 rounded-lg'>
                    <div className='flex flex-wrap justify-center gap-2 mb-4'>
                        {tabs.map(tab => (
                            <button 
                                key={tab} 
                                className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base transition-colors duration-300 ${activeTab === tab ? 'bg-blue-800 text-white' : 'bg-transparent text-white hover:bg-blue-400'} rounded-lg`} 
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className='flex justify-center'>
                        <input 
                            type="text" 
                            placeholder={`Search ${activeTab}...`}
                            className='p-2 rounded-l-lg border border-r-0 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <button className='bg-red-600 text-white p-2 rounded-r-lg'>
                            <FaSearch />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchComponent;