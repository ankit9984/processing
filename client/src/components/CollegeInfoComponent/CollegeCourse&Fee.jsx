import React from 'react'
import CollegeBasicStreamInfo from './CollegeBasicStreamInfo'
// import CollegeFullStreamDetails from './CollegeCutOffDetails'
import CollegeBasicInfoByName from './CollegeBasicInfoByName'
// import CollegeCutOffDetails from './CollegeCutOffDetails'

function CollegeCourse() {
  return (
    <div className=''>
      <CollegeBasicStreamInfo />
      <CollegeBasicInfoByName/>
      {/* <CollegeCutOffDetails/> */}
    </div>
  )
}

export default CollegeCourse
