import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchColleges } from '../../store/SearchSlice';
import SearchResult from '../../utils/HomeUtils/SearchResult';
import { IoCloseSharp } from "react-icons/io5";
import { debounce, trim } from 'lodash'

function HomeSearch() {
    const [activeTab, setActiveTab] = useState('Mumbai');
    const [closeTab, setCloseTab] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const { colleges, loading, error } = useSelector((state) => state.search)
    const tabs = ['Mumbai', 'Pune', 'Nashik', 'Nagpur'];

    const debouncedSearch = debounce((query, region) => {
        dispatch(searchColleges({ query, region }))
    }, 300);

    useEffect(() => {
        if (searchQuery) {
            debouncedSearch(searchQuery, activeTab)
        } else {
            dispatch(searchColleges({ query: '', region: activeTab }));
        }
    }, [searchQuery, activeTab]);

   useEffect(() => {
        if(searchQuery.length > 0){
            setCloseTab(true);
        }else{
            setCloseTab(false)
        }
   },[searchQuery]);

   const handleClose = () => {
        setSearchQuery('')
        dispatch(searchColleges({ query: '', region: activeTab }));
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
                    <div className='w-full flex flex-col'>
                        <div className='flex justify-center w-full'>
                            <div className='w-full relative'>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={`Search ${activeTab}....`}
                                className='flex-grow p-2 rounded-l-md w-full'
                            />
                            {closeTab && <IoCloseSharp onClick={handleClose} className='absolute right-2 top-2' size={25}/>}
                            </div>
                            <button className='bg-red-500 text-white px-4 py-2 rounded-r-md'>
                                {loading ? 'Searching....' : 'Search'}
                            </button>
                        </div>
                        <div className=' w-full mt-1'>
                            <SearchResult colleges={colleges}/>
                        </div>
                        <div className='text-center text-white text-xl'>{error}</div>
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