import React from 'react';
import { useSelector } from 'react-redux';
import { MdLocationPin } from "react-icons/md";

function QueryCollegeInfo() {
    const { filterColleges, loadingFilterColleges, error } = useSelector((state) => state.collegeQuery);

    if (loadingFilterColleges) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Handle empty data or invalid data structure
    const collegesData = filterColleges?.[0]?.colleges || [];
    const totalColleges = filterColleges?.[0]?.totalColleges || 0;

    return (
       <div>
         <div className="mb-4 text-center text-lg font-semibold text-gray-700">
                <p>Total Colleges: {totalColleges}</p>
            </div>
         <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collegesData.length === 0 ? (
                <p>No colleges found.</p>
            ) : (
                collegesData.map((item, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 ease-in-out">
                        <div className="flex items-center mb-4">
                            <img className="w-12 h-12 mr-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZMZuYJkCBLsBf1o2LTTfmhMHsuXjoS2t1rA&s" alt="College Logo" />
                            <h5 className="text-lg font-semibold text-gray-800">{item.collegeName}</h5>
                        </div>
                        <div className="text-sm text-gray-600 mb-2 flex items-center">
                            <MdLocationPin className="mr-2 text-gray-500" />
                            <span>{item.area}, {item.pinCode}</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                            <p className="font-medium">UDISE No. <span className="font-normal">{item.UDISENO}</span></p>
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                            <p className="font-medium">College Type: <span className="font-normal">{item.collegeType}</span></p>
                        </div>
                        <div className="flex space-x-2">
                            <button className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">
                                View College
                            </button>
                            <button className="text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">
                                Book College Visit
                            </button>
                        </div>
                        <button className="mt-4 w-full text-center text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">
                            Brochure
                        </button>
                    </div>
                ))
            )}
        </div>
       </div>
    );
}

export default QueryCollegeInfo;