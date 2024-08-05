import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiArrowDownSLine } from "react-icons/ri";
import { fetchFullCutOffInfoByStreamId } from '../../store/CollegeInfoSlice';

function CollegeBasicCutOffInfoByName() {
  const [isActive, setIsActive] = useState(null);
  const dispatch = useDispatch();
  const { cutOffInfo, cutOffFullInfo, loadingCutOff, loadingFullCuttOff, error } = useSelector((state) => state.collegeInfo);

  if (loadingCutOff) {
    return <div>Loading...</div>;
  }

  if (loadingFullCuttOff) return <div>Loading...</div>

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cutOffInfo || !cutOffInfo.streams || cutOffInfo.streams.length === 0) {
    return <div>No cutoff data available</div>;
  }

  const handleClick = (streamId) => {
    if (isActive === streamId) {
      setIsActive(null)
    } else {
      dispatch(fetchFullCutOffInfoByStreamId(streamId));
      setIsActive(streamId)
    }
  }

  const details = [
    { Name: 'Stream', value: cutOffFullInfo?.streamName },
    { Name: 'Stream Code', value: cutOffFullInfo?.streamCode },
    { Name: 'Status', value: cutOffFullInfo?.streamStatus },
    { Name: 'Medium', value: cutOffFullInfo?.streamMedium },
    { Name: 'Intake', value: cutOffFullInfo?.streamIntake },
    {Name: 'Year', value: cutOffFullInfo?.fullCutOffs?.year},
    {Name: 'Round', value: cutOffFullInfo?.fullCutOffs?.roundNumber}
  ]

  console.log(cutOffFullInfo);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div>
        {cutOffInfo?.streams?.map((item) => (
          <div key={item._id} className='border-gray-200 border-2 px-4 py-2 mb-4 rounded-lg'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-2'>
                <p className='font-semibold'>{item.streamName}</p>
                <p className='text-gray-600'>{item.status}</p>
              </div>
              <div>
                <span className='cursor-pointer text-gray-600 hover:text-gray-900' onClick={() => handleClick(item._id)}><RiArrowDownSLine size={24} /></span>
              </div>
            </div>
            {isActive === item._id && (
              <div className='mt-4 max-w-6xl'>
                <div className='flex flex-col shadow-lg mb-5 p-5 rounded-lg bg-white'>
                  <div className='bg-gray-200 p-2 rounded mb-4'>
                    <h1 className='text-lg font-semibold'>Stream Basic Information</h1>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
                    {details.map((detail, index) => (
                      <div key={index} className='flex items-center gap-2'>
                        <p className='text-gray-700'>{detail.Name}</p>
                        <p className='font-bold text-sm sm:text-lg'>{detail.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                          <th className="py-2 px-4 text-left font-semibold">Reservation Details</th>
                          {Object.keys(cutOffFullInfo?.fullCutOffs?.cutOffs?.[0]?.data).map((item, index) => (
                            <th key={index} className="py-2 px-4 text-left font-semibold">{item}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {cutOffFullInfo.fullCutOffs?.cutOffs?.map((value, index) => (
                          <tr key={index} className='border-b'>
                            <td className='py-2 px-4 border-r'>{value.category}</td>
                            {Object.values(value.data).map((val, i) => (
                              <td key={i} className='py-2 px-4'>{val}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CollegeBasicCutOffInfoByName;
