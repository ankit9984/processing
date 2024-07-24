import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchColleges } from '../../store/SearchSlice';

function HomeSearch() {
    const [activeTab, setActiveTab] = useState('Mumbai');
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const {colleges, loading, error} = useSelector((state) => state.search)
    const tabs = ['Mumbai', 'Pune', 'Nashik', 'Nagpur'];

    const handleClick = () => {
        dispatch(searchColleges({query: searchQuery, region: activeTab}));
    }

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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={`Search ${activeTab}....`}
                            className='flex-grow p-2 rounded-l-md w-full' 
                        />
                        <button onClick={handleClick} className='bg-red-500 text-white px-4 py-2 rounded-r-md'>
                            {loading ? 'Searching....' : 'Search'}
                        </button>
                    </div>
                </div>
                <div className="text-yellow-300 text-sm flex justify-end">
                    <span className="mr-1">💡</span> How UniApply works
                </div>
            </div>
            {
                colleges.length > 0 && (
                    <div className='mt-8'>
                        <h2>Search Result:</h2>
                        <ul>
                            {colleges.map((college) => (
                                <li key={college._id} className="bg-white rounded-lg p-4 shadow">
                                    <h3 className="text-lg font-semibold">{college.jrCollegeName}</h3>
                                    <p className="text-gray-600">{college.popularName}</p>
                                    <p className="text-sm text-gray-500">
                                        {college.address?.area}, {college.address?.pinCode}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </div>
    );
}

export default HomeSearch;