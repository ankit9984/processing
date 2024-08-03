import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {fetchCollegeByslug} from '../../store/CollegeInfoSlice'
// import CollegeInfoComponent from '../../components/CollegeInfoComponent/CollegeInfoComponent';
import Collegebar from '../../components/CollegeInfoComponent/Collegebar';
// import CollegeTopInfo from '../../components/CollegeInfoComponent/CollegeInfoComponent';
import CollegeInfo from '../../components/CollegeInfoComponent/CollegeInfo';
import CollegeCourse from '../../components/CollegeInfoComponent/CollegeCourse&Fee';
// import CollegeInfo from '../../components/CollegeInfoComponent/CollegeInfo';
import CollegeTopInfo from '../../components/CollegeInfoComponent/CollegeTopComponent';
import CollegeAddressInfo from '../../components/CollegeInfoComponent/CollegeAddressInfo';
import CollegeAllSeats from '../../components/CollegeInfoComponent/CollegeAllSeats';
import CollegeCutOffDetails from '../../components/CollegeInfoComponent/CollegeCutOffDetails';

function CollegePageInfo() {
  const {slug} = useParams();
  const dispatch = useDispatch();
  const {college, loading, error} = useSelector((state) => state.collegeInfo);
  const [currentSection, setCurrentSection] = useState('Intro')

  useEffect(() => {
    if(slug){
      dispatch(fetchCollegeByslug(slug))
    }
  },[dispatch, slug])

  // console.log(college);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!college) return <div>No college information available.</div>;

  const renderSection = () => {
    switch(currentSection){
      case 'Intro':
        return <CollegeInfo college={college}/>;
      case 'Courses': 
        return <CollegeCourse/>;
      case 'Address' : 
        return <CollegeAddressInfo />
      case 'Seats':
        return <CollegeAllSeats />
      case 'CutOff': 
        return <CollegeCutOffDetails/>
      default : 
        return <div>hey</div>
    }
  }

  // console.log(college);

  return (
    <div className='mx-4'>
      <CollegeTopInfo college={college}/>
      {/* <CollegeInfoComponent college={college}/> */}
      <Collegebar setCurrentSection={setCurrentSection}/>
      {renderSection()}
    </div>
  )
}

export default CollegePageInfo
