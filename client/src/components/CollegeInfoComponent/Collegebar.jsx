import React from 'react';
import { FaInfoCircle, FaGraduationCap, FaMapMarkerAlt, FaChartLine, FaMoneyBillWave, FaImage } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCollegeById, fetchStreamInfoByCollegeId } from '../../store/CollegeInfoSlice';

function Collegebar({setCurrentSection}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { college, loading, error } = useSelector((state) => state.collegeInfo);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!college) return <div>No college information available.</div>;

  const handleClick = (id, location) => {
    switch (location) {
      case 'Intro':
        dispatch(fetchCollegeById(id));
        setCurrentSection(location)
        break;
      case 'Courses':
        dispatch(fetchStreamInfoByCollegeId(id));
        setCurrentSection(location)
        navigate('course-fees')
      default:
        alert('Invalid section location');
    }
  };

  const sections = [
    { id: college._id, icon: FaInfoCircle, label: 'Intro', location: 'Intro' },
    { id: college._id, icon: FaGraduationCap, label: 'Courses & Fees', location: 'Courses' },
    { id: college._id, icon: FaMapMarkerAlt, label: 'Address', location: 'Address' },
    { id: college._id, icon: FaChartLine, label: 'Cutoff', location: 'CutOff' },
    { id: college._id, icon: FaMoneyBillWave, label: 'Fees', location: 'Fees' },
    { id: college._id, icon: FaImage, label: 'Photo', location: 'Photo' }
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex whitespace-nowrap p-4 bg-gray-100 shadow-lg" style={{ minWidth: 'max-content' }}>
        {sections.map((section) => (
          <Link key={section.location} className="flex-shrink-0 mx-2">
            <button
              onClick={() => handleClick(section.id, section.location)}
              className="flex items-center text-sm font-medium"
            >
              <section.icon className="text-xl mr-2 text-blue-600" />
              <span>{section.label}</span>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Collegebar;