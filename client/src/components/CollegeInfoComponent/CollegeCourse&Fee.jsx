import React from 'react'
import CollegeBasicStreamInfo from './CollegeBasicStreamInfo'
import CollegeFullStreamDetails from './CollegeFullStreamDetails'
import CollegeBasicInfoByName from './CollegeBasicInfoByName'

function CollegeCourse() {
  return (
    <div>
      <CollegeBasicStreamInfo />
      <CollegeBasicInfoByName/>
      <CollegeFullStreamDetails/>
    </div>
  )
}

export default CollegeCourse
