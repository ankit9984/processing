import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowDown } from "react-icons/io";
import { fetchFullStreamDetailsByStreamId } from '../../store/CollegeInfoSlice';

function CollegeBasicInfoByName() {
  const [activeStreamId, setActiveStreamId] = useState(null);
  const { streamDetails, loading, error } = useSelector((state) => state.collegeInfo);
  const dispatch = useDispatch();
  const { streamFullDetails } = useSelector((state) => state.collegeInfo)
  if (loading) return <div></div>
  console.log('me', streamDetails);
  const handleClick = (id) => {
    if (activeStreamId === id) {
      setActiveStreamId(null)
    } else {
      dispatch(fetchFullStreamDetailsByStreamId(id))
      setActiveStreamId(id)
    }
    // setIsActive(!isActive)
    // console.log('hey', streamFullDetails);
  }

  // console.log('hey', streamFullDetails);
  return (
    <div>
      {streamDetails.streams.map((stream) => (
        <div className='max-w-6xl mx-auto'>
          <div key={stream.streamId} className='flex justify-between items-center bg-white m-5 p-5 mx-w-6xl rounded shadow-lg border-gray-200 border'>
            <div className='flex gap-5'>
              <p className='text-sm sm:text-2xl'>{stream.streamName}</p>
              <p className='text-sm sm:text-2xl' >{stream.streamStatus}</p>
            </div>
            <IoIosArrowDown onClick={() => handleClick(stream.streamId)} fontSize={25} />
          </div>
          {activeStreamId === stream.streamId && (
            <div>
              <div className='flex flex-col item '>
                <div className='bg-gray-200 p-2 rounded'>
                  <h1>Stream Basic Information</h1>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='flex gap-2 items-center'>
                    <p>Stream:</p>
                    <p className='font-bold text-sm sm:text-xl'>{streamFullDetails.streamName}</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <p>Stream Code:</p>
                    <p className='font-bold text-sm sm:text-xl'>{streamFullDetails.streamCode}</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <p>Status</p>
                    <p className='font-bold text-sm sm:text-xl'>{streamFullDetails.status}</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <p>Medium:</p>
                    <p className='font-bold text-sm sm:text-xl'>{streamFullDetails.medium}</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <p>Intake:</p>
                    <p className='font-bold text-sm sm:text-xl'>{streamFullDetails.intake}</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <p>Minoriry Details</p>
                    <p className='font-bold text-sm sm:text-xl'>{streamFullDetails.minority}</p>
                  </div>
                </div>
              </div>
              <div className='w-full my-2'>
                <div className=''>
                  <h1 className='p-2 bg-gray-100'>Fee Details</h1>
                </div>
                <div className='w-full '>
                  <table className='w-full'>
                    <thead>
                      <tr className='bg-gray-50'>
                        <th className='px-4 py-2 text-xs text-gray-500 border-b border-gray-200 text-center'>Tution Fees</th>
                        <th className='px-4 py-2 text-xs text-gray-500 border-b border-gray-200 text-center'>Term Fees</th>
                        <th className='px-4 py-2 text-xs text-gray-500 border-b border-gray-200 text-center'>Other Fees</th>
                        <th className='px-4 py-2 text-xs text-gray-500 border-b border-gray-200 text-center'>Total Fees</th>
                        <th className='px-4 py-2 text-xs text-gray-500 border-b border-gray-200 text-center'>AnnualFees IT</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{streamFullDetails?.fee.tutionFees}</td>
                        <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{streamFullDetails?.fee.termFees}</td>
                        <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{streamFullDetails?.fee.otherFees}</td>
                        <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{streamFullDetails?.fee.totalFees}</td>
                        <td className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>{streamFullDetails?.fee.annualFeesForIT}</td>
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
  )
}

export default CollegeBasicInfoByName
