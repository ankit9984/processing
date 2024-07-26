import React, { useEffect } from 'react';
import CollegeInfoComponent from '../../components/CollegeInfoComponent/CollegeInfoComponent';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollegeByslug } from '../../store/CollegeInfoSlice';

function CollegePageInfo() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { college, loading, error } = useSelector((state) => state.collegeInfo);

  useEffect(() => {
    if (slug) {
      dispatch(fetchCollegeByslug(slug));
    }
  }, [dispatch, slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!college) return <div>No college information available.</div>;

  return (
    <div>
      <CollegeInfoComponent college={college} />
      {/* {college.collegeName} */}
    </div>
  );
}

export default CollegePageInfo;
