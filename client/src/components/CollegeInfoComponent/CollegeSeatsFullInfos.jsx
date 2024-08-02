import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowDown } from "react-icons/io";
import { fetchCollegeSeatsFullInfoByStreamId } from '../../store/CollegeInfoSlice';

function CollegeSeatsFullInfos() {
  const [isActive, setIsActive] = useState(null);
  const dispatch = useDispatch();
  const { seatsDetails, seatsFullInfo, loadingseatsFullInfo, loadingSeats, error } = useSelector((state) => state.collegeInfo);

  if (loadingSeats) return <div>Loading...</div>;
  if (loadingseatsFullInfo) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error loading data</div>;

  const upper = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const handleClick = (streamId) => {
    if (isActive === streamId) {
      setIsActive(null);
    } else {
      dispatch(fetchCollegeSeatsFullInfoByStreamId(streamId));
      setIsActive(streamId);
    }
  };

  const details = [
    { label: 'Stream', value: seatsFullInfo?.streamName },
    { label: 'Stream Code', value: seatsFullInfo?.streamCode },
    { label: 'Status', value: seatsFullInfo?.status },
    { label: 'Medium', value: seatsFullInfo?.medium },
    { label: 'Intake', value: seatsFullInfo?.intake },
    { label: 'Minority Details', value: seatsFullInfo?.minority },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      {seatsDetails?.streams?.map((stream) => (
        <div key={stream.streamId}>
          <div className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <p className="text-lg font-semibold">{stream.streamName}</p>
              <p className="text-sm text-gray-500">{stream.streamCode}</p>
              <span className="text-base font-medium">{stream.streamIntakeCapacity}</span>
            </div>
            <div className="text-gray-400 hover:text-gray-600 cursor-pointer transition duration-150">
              <IoIosArrowDown onClick={() => handleClick(stream.streamId)} size={24} />
            </div>
          </div>
          {isActive === stream.streamId && (
            <div className="mt-4 bg-white shadow-lg rounded-lg overflow-hidden">
              <div className='flex flex-col p-5 rounded overflow-x-auto'>
                <div className='bg-gray-200 p-4 rounded'>
                  <h1 className="text-lg font-bold">Stream Basic Information</h1>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
                  {details.map((detail, index) => (
                    <div key={index} className='flex gap-2 items-center'>
                      <p className="font-medium">{detail.label}:</p>
                      <p className='font-bold text-sm sm:text-lg'>{detail.value || 'N/A'}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <th className="py-2 px-4 text-left font-semibold">Category</th>
                      {seatsFullInfo?.reservationSeats?.map((header, index) => (
                        <th key={index} className="py-2 px-4 text-left font-semibold">
                          <div>{header.category}</div>
                          <div>({header.percentage}%)</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='bg-gray-50 border-b'>
                      <td className="py-2 px-4 text-left font-medium">Original Seats</td>
                      {seatsFullInfo?.reservationSeats?.map((seats, index) => (
                        <td key={index} className="py-2 px-4 text-left">{seats.originalseats}</td>
                      ))}
                    </tr>
                    {Object.keys(seatsFullInfo?.reservationSeats?.[0]?.reservations || {}).map((reservationName, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white border-b' : 'bg-gray-50 border-b'}>
                        <td className="py-2 px-4 text-left">{upper(reservationName)}</td>
                        {seatsFullInfo?.reservationSeats?.map((reservation, i) => (
                          <td key={i} className="py-2 px-4 text-left border-r-2">{reservation.reservations[reservationName]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CollegeSeatsFullInfos;
