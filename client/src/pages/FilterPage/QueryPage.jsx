import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from "react-icons/io";
import { clearTrack, filterColleges, removeFromTrack } from '../../store/CollegeQuerySlice';
import QueryCollegeComp from '../../components/QueryComponent/QueryCollegeComp';
import QueryData from '../../components/QueryComponent/QueryData';
import QueryCollegeInfo from '../../components/QueryComponent/QueryCollegeInfo';

function QueryPage() {
  const dispatch = useDispatch();
  const showQuery = useSelector((state) => state.collegeQuery.showQuery);
  const track = useSelector((state) => state.collegeQuery.track);

  const getFilterCriteria = (track) => {
    const criteria = {};
    track.forEach(item => {
      criteria[item.type] = item.value;
    });
    return criteria;
  }

  const handleClear = () => {
    dispatch(clearTrack());
  };

  const handleRemoveItem = (value, type) => {
    dispatch(removeFromTrack({ value, type }));
    const updatedTrack = track.filter(item => {
      if (type === 'region') {
        return item.type !== 'region' && item.type !== 'zone' && item.type !== 'area';
      } else if (type === 'zone') {
        return item.type !== 'zone' && item.type !== 'area';
      } else {
        return item.value !== value;
      }
    });
    const filterCriteria = getFilterCriteria(updatedTrack);
    dispatch(filterColleges(filterCriteria));
  };

  return (
    <div>
      <QueryCollegeComp />
      {showQuery && <QueryData />}
      <div className='flex max-w-6xl gap-2 w-full mt-2 rounded shadow mx-auto'>
        {track.length > 0 && (
          track.map((item, index) => (
            <div key={index} className='flex items-center gap-5 px-4 py-2 rounded'>
              <span className='bg-gray-100'>{item.value}</span>
              <span onClick={() => handleRemoveItem(item.value, item.type)}><IoMdClose /></span>
            </div>
          ))
        )}
      </div>
      <QueryCollegeInfo/>
    </div>
  );
}

export default QueryPage;