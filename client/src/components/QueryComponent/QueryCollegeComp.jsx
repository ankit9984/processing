import React from 'react';
import { IoIosArrowDown } from "react-icons/io";
import axiosInstance from '../../api/AxiosInstance';

function QueryCollegeComp() {
    const details = [
        { Name: 'All Filter', icon: <IoIosArrowDown />, location: 'All' },
        { Name: 'Stream', icon: <IoIosArrowDown />, location: 'Stream' },
        { Name: 'State', icon: <IoIosArrowDown />, location: 'State' },
        { Name: 'City', icon: <IoIosArrowDown />, location: 'City' },
        { Name: 'Course', icon: <IoIosArrowDown />, location: 'Course' },
        { Name: 'Program Type', icon: <IoIosArrowDown />, location: 'ProgramType' }
    ];

    return (
        <div className="flex space-x-4 p-4 bg-white shadow">
            {details.map((item, index) => (
                <div key={index} className="flex items-center px-4 py-2 border rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200">
                    <span className="text-sm">{item.Name}</span>
                    <span className="ml-2"><IoIosArrowDown /></span>
                </div>
            ))}
        </div>
    );
}

export default QueryCollegeComp;



