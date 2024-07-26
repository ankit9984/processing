import React, { useEffect } from 'react'
import { FaInfoCircle, FaGraduationCap, FaMapMarkerAlt, FaChartLine, FaMoneyBillWave, FaImage } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchCollegeByslug } from '../../store/CollegeInfoSlice';

function Collegebar({college}) {
  console.log(college._id);
    // const {slug} = useParams();
    // const distpatch = useDispatch();
    // const {college, loaidng, error} = useSelector((state) => state.collegeInfo);
    // useEffect(() => {
    //     distpatch(fetchCollegeByslug(slug));
    // },[slug])
    // console.log('me', college);
    
    const sections = [
        {id: college._id ,icon: FaInfoCircle, label: 'Intro'},
        // {icon: FaGraduationCap, label: 'Courses & Fess'},
        // {icon: FaMapMarkerAlt, label: 'Address'},
        // {icon: FaChartLine, label: 'Cutoff'},
        // {icon: FaMoneyBillWave, label: 'Fees'},
        // {icon: FaImage, lable: 'Photo'}
    ]
  return (
    <div className='flex flex-wrap justify-center gap-4 p-4 bg-gray-100 shadow-lg'>
      {sections.map((section) => (
        <Link key={section.id}>
            {/* <section.icon className='text-2xl mb-1 text-blue-600'/> */}
            <span className='text-sm font-medium'>{section.label}</span>
        </Link>
      ))}
    </div>
  )
}

export default Collegebar
