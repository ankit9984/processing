import React from 'react'
import { useSelector } from 'react-redux';

function CollegeBasicStreamInfo() {
    const { streamDetails, loading, error } = useSelector((state) => state.collegeInfo);
    // console.log(streamDetails);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!streamDetails || !streamDetails.streams || streamDetails.streams.length === 0) {
        return <div>No stream data available</div>;
    }

    return (
        <div className='max-w-6xl overflow-x-auto mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
            <div className='p-8 text-center'>
                <div className='uppercase tracking-wide text-lg text-indigo-500 font-semibold mb-4'>College Streams</div>
            </div>
            <div className='bg-gray-100  p-5 rounded-md'>
                <table className='min-w-full bg-white border border-gray-200'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-200 text-center'>Serial No</th>
                            <th className='px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-200 text-center'>Stream Code</th>
                            <th className='px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-200 text-center'>Stream</th>
                            <th className='px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-200 text-center'>Status</th>
                            <th className='px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-200 text-center'>Medium</th>
                            <th className='px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-200 text-center'>Intake</th>
                            <th className='px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-200 text-center'>Fees</th>
                        </tr>
                    </thead>
                    <tbody>
                        {streamDetails.streams.map((stream, index) => (
                            <tr key={stream.streamId} className='bg-gray-50'>
                                <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{index+1}</td>
                                <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{stream.streamCode}</td>
                                <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{stream.streamName}</td>
                                <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{stream.streamStatus}</td>
                                <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{stream.streamMedium}</td>
                                <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{stream.streamIntake}</td>
                                <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{stream.streamTotalFees || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CollegeBasicStreamInfo
