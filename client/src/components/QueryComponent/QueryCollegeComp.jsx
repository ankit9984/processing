import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFilter, setShowQuery } from '../../store/CollegeQuerySlice';
// import { setSelectedFilter, setShowQuery } from '../../store/UiCollegeQuerySlice';

function QueryCollegeComp() {
    const dispatch = useDispatch();
    // const selectedFilter = useSelector((state) => state.uiCollQuery.selectedFilter);
    const selectedFilter = useSelector((state) => state.collegeQuery.selectedFilter);
    
    
    const details = [
        { Name: 'All Filter', icon: <IoIosArrowDown />, location: 'All' },
        { Name: 'Region', icon: <IoIosArrowDown />, location: 'Region' },
        { Name: 'Zone', icon: <IoIosArrowDown />, location: 'Zone' },
        { Name: 'Area', icon: <IoIosArrowDown />, location: 'Area' },
        { Name: 'Stream', icon: <IoIosArrowDown />, location: 'Stream' },
        { Name: 'Stream Status', icon: <IoIosArrowDown />, location: 'Status' },
        { Name: 'College Type', icon: <IoIosArrowDown />, location: 'CollegeType' },
        { Name: 'Medium', icon: <IoIosArrowDown />, location: 'Medium' },
    ];
    
    const handleClick = (item) => {
        if(item === selectedFilter){
            dispatch(setShowQuery(true));
            dispatch(setSelectedFilter(item));
            // alert(item)
        }else {
            dispatch(setShowQuery(false));
            dispatch(setSelectedFilter(item));
        }
    }
   
    return (
        <div className="flex space-x-4 p-4 bg-white shadow overflow-x-auto">
            {details.map((item, index) => (
                <div key={index} onClick={() => handleClick(item.location)} className="flex items-center px-4 py-2 border text-nowrap rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200">
                    <span className="text-sm">{item.Name}</span>
                    <span className="ml-2"><IoIosArrowDown /></span>
                </div>
            ))}
        </div>
    );
}

export default QueryCollegeComp;