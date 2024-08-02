import React from 'react'
import { useSelector } from 'react-redux'

function CollegeSeatsInfo() {
    const {seatsDetails, loadingSeats, error} = useSelector((state) => state.collegeInfo);
    console.log(seatsDetails);

    if(loadingSeats) return <div>Loading</div>

    const tableHeaders = ['Serial No', 'Stream Code', 'Stream', 'Status', 'Intake'];
  return (
    <div className='max-w-6xl overflow-x-auto mx-auto rounded-xl shadow-md overflow-hidden'>
      <div>College Seats Info</div>
      <div>
        <table className='min-w-full bg-white border border-gray-200'>
            <thead className='bg-gray-50'>
                <tr>
                   {tableHeaders.map((header) => (
                        <th key={header} className='px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-200 text-center'>{header}</th>
                   ))}
                </tr>
            </thead>
            <tbody>
                {seatsDetails.streams.map((stream, index) => (
                    <tr key={index} className='bg-gray-50'>
                        <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{index + 1}</td>
                        <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{stream.streamCode}</td>
                        <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{stream.streamName}</td>
                        <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{stream.streamStatus}</td>
                        <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{stream.streamIntakeCapacity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default CollegeSeatsInfo
