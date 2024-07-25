import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollegeByslug } from '../../store/CollegeInfoSlice';

function CollegeInfo() {
  const { slug } = useParams();
  console.log(slug);
  const dispatch = useDispatch();
  const { college, loading, error } = useSelector((state) => state.collegeInfo);

  useEffect(() => {
    dispatch(fetchCollegeByslug(slug));
  }, [dispatch, slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!college) return <div>No college information found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{college.jrCollegeName}</h1>
      <h2 className="text-xl text-gray-600 mb-4">{college.popularName}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">UDISE Number:</h3>
          <p>{college.udiseNumber}</p>
        </div>
        <div>
          <h3 className="font-semibold">Society Management:</h3>
          <p>{college.societyManagement}</p>
        </div>
        <div>
          <h3 className="font-semibold">Type of Management:</h3>
          <p>{college.typeOfManagement}</p>
        </div>
        <div>
          <h3 className="font-semibold">Year of Foundation:</h3>
          <p>{college.yearOfFoundation}</p>
        </div>
        <div>
          <h3 className="font-semibold">Attached To:</h3>
          <p>{college.attachedTo}</p>
        </div>
        <div>
          <h3 className="font-semibold">College Type:</h3>
          <p>{college.collegeType}</p>
        </div>
      </div>
    </div>
  );
}

export default CollegeInfo;