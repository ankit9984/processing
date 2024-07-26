import React from 'react';
import { useSelector } from 'react-redux';

function CollegeInfo() {
    const { college, loading, error } = useSelector((state) => state.collegeInfo);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!college) {
        return <div>No college data available</div>;
    }

    const highlights = [
        { particular: 'UDISE NO', details: college.udise || 'N/A' },
        { particular: 'Foundation', details: college.foundationYear || 'N/A' },
        { particular: 'Management', details: college.managment || 'N/A' },
        { particular: 'College Type', details: college.type || 'N/A' }
    ];

    return (
        <div className='max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
            <div className='p-8 text-center'>
                <div className='uppercase tracking-wide text-lg text-indigo-500 font-semibold mb-4'>{college.collegeName} Highlights 2024</div>
            </div>
            <div className='bg-gray-100 p-5 rounded-md'>
                <table className='min-w-full bg-white'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Particular</th>
                            <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Details</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {highlights.map((item, index) => (
                            <tr key={index} className='bg-gray-50'>
                                <td className='px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>{item.particular}</td>
                                <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>{item.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CollegeInfo;
