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
    <div className='border p-5'>
      {streamDetails?.streams?.map((stream) => (
        <div className={`max-w-6xl mx-auto bg-gray-100 ${stream.streamId === activeStreamId ? 'bg-slate-50': 'bg-opacity-0'} shadow-2xl my-5`} key={stream.streamId}>
          <div className='flex justify-between items-center bg-white p-5 rounded shadow-lg border-gray-200 border'>
            <div className='flex flex-col sm:flex-row gap-5'>
              <p className='text-sm sm:text-2xl'>{stream.streamName}</p>
              <p className='text-sm sm:text-2xl'>{stream.streamStatus}</p>
            </div>
            <IoIosArrowDown onClick={() => handleClick(stream.streamId)} fontSize={25} />
          </div>
          {activeStreamId === stream.streamId && (
            <div className='p-5'>
              <div className='flex flex-col shadow-lg mb-5 p-5 rounded overflow-x-auto'>
                <div className='bg-gray-200 p-2 rounded'>
                  <h1>Stream Basic Information</h1>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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
              <div className='w-full my-2 shadow-lg mb-5 p-5 rounded overflow-x-auto'>
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
              <div className='shadow-lg mb-5 p-5 rounded overflow-x-auto'>
                <div className='bg-gray-200 p-2 rounded'>
                  <h1>Optional Subjects</h1>
                </div>
                <div>
                  <table className='w-full'>
                    <thead>
                      <tr>
                        <th className='border p-2'>Sr. No.</th>
                        <th className='border p-2'>Subjects</th>
                        <th className='border p-2'>Intake</th>
                      </tr>
                    </thead>
                    <tbody>
                      {streamFullDetails?.optionalSubject?.map((subject, index) => (
                        <tr key={subject._id}>
                          <td className='border p-2 text-center'>{index + 1}</td>
                          <td className='border p-2 text-center'>{subject.subject}</td>
                          <td className='border p-2 text-center'>{subject.intake}</td>
                        </tr>
                      )) || (
                        <tr>
                          <td colSpan="3" className='border p-2 text-center'>No Optional Subjects Available</td>
                        </tr>
                      )}
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
