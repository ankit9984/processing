import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {fetchCollegeByslug} from '../../store/CollegeInfoSlice'
import CollegeInfoComponent from '../../components/CollegeInfoComponent/CollegeInfoComponent';
import Collegebar from '../../components/CollegeInfoComponent/Collegebar';
import CollegeInfo from '../../components/CollegeInfoComponent/CollegeInfo';

function CollegePageInfo() {
  const {slug} = useParams();
  const dispatch = useDispatch();
  const {college, loading, error} = useSelector((state) => state.collegeInfo);

  useEffect(() => {
    if(slug){
      dispatch(fetchCollegeByslug(slug))
    }
  },[dispatch, slug])

  // console.log(college);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!college) return <div>No college information available.</div>;

  // console.log(college);

  return (
    <div>
      <CollegeInfoComponent college={college}/>
      <Collegebar college={college}/>
      <CollegeInfo/>
    </div>
  )
}

export default CollegePageInfo
