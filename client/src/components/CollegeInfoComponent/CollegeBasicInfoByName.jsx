import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowDown } from "react-icons/io";
import { fetchFullStreamDetailsByStreamId } from '../../store/CollegeInfoSlice';

function CollegeBasicInfoByName() {
  const [isActive, setIsActive] = useState(false);
  const { streamDetails, loading, error } = useSelector((state) => state.collegeInfo);
  const dispatch = useDispatch();
  const { streamFullDetails } = useSelector((state) => state.collegeInfo)
  if (loading) return <div></div>
  console.log('me', streamDetails);
  const handleClick = (id) => {
    dispatch(fetchFullStreamDetailsByStreamId(id))
    setIsActive(!isActive)
    // console.log('hey', streamFullDetails);
  }

  console.log('hey', streamFullDetails);
  return (
    <div>
      {streamDetails.streams.map((stream) => (
        <div>
          <div key={stream.streamId} className='flex justify-between items-center bg-white m-5 p-5 mx-w-6xl rounded shadow-lg border-gray-200 border'>
            <div className='flex gap-5'>
              <p className='text-sm sm:text-2xl'>{stream.streamName}</p>
              <p className='text-sm sm:text-2xl' >{stream.streamStatus}</p>
            </div>
            <IoIosArrowDown onClick={() => handleClick(stream.streamId)} fontSize={25} />
          </div>
          {isActive && (
            <div>hey</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CollegeBasicInfoByName
