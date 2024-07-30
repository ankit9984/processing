import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowDown } from 'react-icons/io';
import { fetchFullStreamDetailsByStreamId } from '../../store/CollegeInfoSlice';

function CollegeBasicInfoByName() {
  const [activeStreamId, setActiveStreamId] = useState(null);
  const { streamDetails, loading, error } = useSelector((state) => state.collegeInfo);
  const dispatch = useDispatch();
  const { streamFullDetails } = useSelector((state) => state.collegeInfo);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleClick = (id) => {
    if (activeStreamId === id) {
      setActiveStreamId(null);
    } else {
      dispatch(fetchFullStreamDetailsByStreamId(id));
      setActiveStreamId(id);
    }
  };

  return (
    <div>
      {streamDetails?.streams?.map((stream) => (
        <div className='max-w-6xl mx-auto' key={stream.streamId}>
          <div className='flex justify-between items-center bg-white m-5 p-5 mx-w-6xl rounded shadow-lg border-gray-200 border'>
            <div className='flex gap-5'>
              <p className='text-sm sm:text-2xl'>{stream.streamName}</p>
              <p className='text-sm sm:text-2xl'>{stream.streamStatus}</p>
            </div>
            <IoIosArrowDown onClick={() => handleClick(stream.streamId)} fontSize={25} />
          </div>
          {activeStreamId === stream.streamId && (
            <div>
              <div className='flex flex-col'>
                <div className='bg-gray-200 p-2 rounded'>
                  <h1>Stream Basic Information</h1>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='flex gap-2 items-center'>
                    <p>Stream:</p>
                    <p className='font-bold text-sm sm:text-xl'>{streamFullDetails?.streamName || 'N/A'}</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <p>Stream Code:</p>
                    <p className='font-bold text-sm sm:text-xl'>{streamFullDetails?.streamCode || 'N/A'}</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <p>Status:</p>
                    <p className='font-bold text-sm sm:text-xl'>{streamFullDetails?.status || 'N/A'}</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <p>Medium:</p>
                    <p className='font-bold text-sm sm:text-xl'>{streamFullDetails?.medium || 'N/A'}</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <p>Intake:</p>
                    <p className='font-bold text-sm sm:text-xl'>{streamFullDetails?.intake || 'N/A'}</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <p>Minority Details:</p>
                    <p className='font-bold text-sm sm:text-xl'>{streamFullDetails?.minority || 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className='w-full my-2'>
                <div>
                  <h1 className='p-2 bg-gray-100'>Fee Details</h1>
                </div>
                <div className='w-full'>
                  <table className='w-full'>
                    <thead>
                      <tr className='bg-gray-50'>
                        <th className='px-4 py-2 text-xs text-gray-500 border-b border-gray-200 text-center'>Tuition Fees</th>
                        <th className='px-4 py-2 text-xs text-gray-500 border-b border-gray-200 text-center'>Term Fees</th>
                        <th className='px-4 py-2 text-xs text-gray-500 border-b border-gray-200 text-center'>Other Fees</th>
                        <th className='px-4 py-2 text-xs text-gray-500 border-b border-gray-200 text-center'>Total Fees</th>
                        <th className='px-4 py-2 text-xs text-gray-500 border-b border-gray-200 text-center'>Annual Fees IT</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{streamFullDetails?.fee?.tutionFees || 'N/A'}</td>
                        <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{streamFullDetails?.fee?.termFees || 'N/A'}</td>
                        <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{streamFullDetails?.fee?.otherFees || 'N/A'}</td>
                        <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{streamFullDetails?.fee?.totalFees || 'N/A'}</td>
                        <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{streamFullDetails?.fee?.annualFeesForIT || 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CollegeBasicInfoByName;
