import React, { useState } from 'react';

function HomeSearch() {
    const [activeTab, setActiveTab] = useState('Mumbai');
    const tabs = ['Mumbai', 'Pune', 'Nashik', 'Nagpur'];

    return (
        <div className='bg-blue-600 min-h-[50%] flex flex-col items-center justify-center p-4'>
            <div className='max-w-3xl w-full'>
                <h1 className='text-white text-xl sm:text-2xl font-bold mb-6 text-center'>
                    The School Admission Platform, {activeTab}
                </h1>
                <div className='bg-blue-700 rounded-lg p-4 mb-4 flex flex-col items-center'>
                    <nav className='flex mb-4 w-full items-center justify-around'>
                       {tabs.map((tab) => (
                            <button
                                key={tab}
                                className={`text-white mr-4 text-xs sm:text-lg pb-2 ${activeTab === tab ? 'border-b-2' : 'border-0'}`} 
                                onClick={() => setActiveTab(tab)}>{tab}</button>
                       ))}
                    </nav>
                    <div className='flex justify-center w-full'>
                        <input 
                            type="text"
                            placeholder={`Search ${activeTab}....`}
                            className='flex-grow p-2 rounded-l-md w-full' 
                        />
                        <button className='bg-red-500 text-white px-4 py-2 rounded-r-md'>
                            Search
                        </button>
                    </div>
                </div>
                <div className="text-yellow-300 text-sm flex justify-end">
                    <span className="mr-1">💡</span> How UniApply works
                </div>
            </div>
        </div>
    );
}

export default HomeSearch;