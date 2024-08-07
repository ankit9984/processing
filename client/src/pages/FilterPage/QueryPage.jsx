import React from 'react'
import QueryCollegeComp from '../../components/QueryComponent/QueryCollegeComp'
import { useDispatch, useSelector } from 'react-redux'
import QueryData from '../../components/QueryComponent/QueryData'
import { IoMdClose } from "react-icons/io";

function QueryPage() {
  const dispatch = useDispatch();
  const showQuery = useSelector((state) => state.uiCollQuery.showQuery);
  const { track, clearTrack } = useSelector((state) => state.collegeQuery);

  const handleClear = () => {
    dispatch(clearTrack());
  }
  return (
    <div>
      <QueryCollegeComp />
      {showQuery && <QueryData />}
      <div className='flex max-w-6xl gap-2 w-full mt-2 rounded shadow mx-auto'>
        {track.length > 0 && (
          track.map((item, index) => (
            <div>
              <div key={index} className='flex items-center gap-5  px-4 py-2 rounded'>
                <span className='bg-gray-100'>{item}</span>
                <span><IoMdClose /></span>
              </div>
            </div>
          ))
        )}
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default QueryPage
