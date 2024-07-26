import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollegeByslug } from '../../store/CollegeInfoSlice';
import { FaLocationPin } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";

function CollegeInfo({college}) {
  // const { slug } = useParams();
  // const dispatch = useDispatch();
  // const { college, loading, error } = useSelector((state) => state.collegeInfo);

  // useEffect(() => {
  //   dispatch(fetchCollegeByslug(slug));
  // }, [dispatch, slug]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;
  // if (!college) return <div>No college information found</div>;

  return (
    <div className='flex flex-col gap2 justify-between p-2 shadow-lg'>
      <div className='flex justify-between p-5'>
        <h1 className='text-xl sm:text-5xl'>{college.collegeName}</h1>
        <img className='w-10' src={`https://test.tcetmumbai.in/Images/TCET%20Logo.png`} alt="" />
      </div>
      <div className='flex gap-5 items-center pl-5 text-xl'>
        <div className='flex items-center gap-3'>
          <FaLocationPin/>
          <span className='text-sm'>{college.address?.city}, {college.address.pinCode}</span>
        </div>
        <div className='flex items-center gap-2'>
          <FaCalendarAlt />
          <span className='text-sm'>{college.foundationYear}</span>
        </div>
        <div className='flex gap-2 items-center text-orange-600'>
          <p className='text-sm'>{college.managment}</p>
          <p className='text-sm'>{college.type}</p>
        </div>
      </div>
    </div>
  );
}

export default CollegeInfo;