import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../store/regionSlice';
import { fetchZonesByRegion, setShowQuery, addToTrack, fetchCitiesByZoneAndRegion, filterColleges } from '../../store/CollegeQuerySlice';

function QueryData() {
  const selectedFilter = useSelector((state) => state.collegeQuery.selectedFilter);
  const { filteredRegions, searchTerm, type, stream, streamStatus, medium } = useSelector((state) => state.regions);
  const { zones, loadingZone, area, loadingArea } = useSelector((state) => state.collegeQuery);
  const track = useSelector((state) => state.collegeQuery.track);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClickRegion = (region) => {
    dispatch(addToTrack({ type: 'region', value: region }));
  };

  const handleClickZone = (zone) => {
    dispatch(addToTrack({ type: 'zone', value: zone }));
  };

  const handleClickArea = (area) => {
    dispatch(addToTrack({type: 'Area', value: area}))
  }

  const handleClickStream = (stream) => {
    dispatch(addToTrack({type: 'Stream', value: stream}))
  };

  const handleClickStatus = (status) => {
    dispatch(addToTrack({type: 'Status', value: status}))
  };
  
  const handleClickCollegeType = (type) => {
    dispatch(addToTrack({type: 'Type', value: type}))
  };

  const handleClickMedium = (medium) => {
    dispatch(addToTrack({type: 'Medium', value: medium}))
  }

  // const handleApply = () => {
  //   const region = track.find(item => item.type === 'region');
  //   const zone = track.find(item => item.type === 'zone');
  //   if (region) {
  //     dispatch(fetchZonesByRegion(region.value));
  //   } if(zone){
  //     dispatch(fetchCitiesByZoneAndRegion({region: region.value, zone: zone.value}))
  //   }
  //   dispatch(setShowQuery(false));
  // };

  const handleApply = () => {
    const region = track.find(item => item.type === 'region')?.value;
    const zone = track.find(item => item.type === 'zone')?.value;
    const area = track.find(item => item.type === 'area')?.value;
    const collegeType = track.find(item => item.type === 'CollegeType')?.value;
    const streamName = track.find(item => item.type === 'Stream')?.value;
    const status = track.find(item => item.type === 'Status')?.value;
    const medium = track.find(item => item.type === 'Medium')?.value;
    
  
    const filters = {
      region,
      zone,
      area,
      collegeType,
      streamName,
      status,
      medium,
    };
  
    dispatch(filterColleges(filters));

    if (region) {
      dispatch(fetchZonesByRegion(region));
    }
    if (zone) {
      dispatch(fetchCitiesByZoneAndRegion({ region, zone }));
    }
    dispatch(setShowQuery(false));
  };

  if (loadingZone) return <div>Loading...</div>;
  if(loadingArea) return <div>Loading area...</div>

  return (
    <div className='p-4 bg-white shadow-md rounded-lg max-w-md mx-auto'>
      <h2 className='text-xl font-bold mb-4'>Region</h2>
      <div className='mb-4'>
        <input
          type="text"
          placeholder='Find Region'
          value={searchTerm}
          onChange={handleSearch}
          className='w-full p-2 border rounded text-black'
        />
      </div>
      <div>
        {selectedFilter === 'Region' && filteredRegions.length > 0 && (
          filteredRegions.map((region, index) => (
            <div 
              key={index}
              onClick={() => handleClickRegion(region)}
              className={`py-2 border-b ${track.some(item => item.value === region) ? 'bg-gray-200' : ''}`}>
                {region}
            </div>
          ))
        )}
        {selectedFilter === 'Zone' && zones.length > 0 && (
          zones.map((zone, index) => (
            <div
              key={index}
              onClick={() => handleClickZone(zone)}
              className={`py-2 border-b ${track.some(item => item.value === zone) ? 'bg-gray-200' : ''}`}>
                {zone}
            </div>
          ))
        )}
        {selectedFilter === 'Area' && area.length > 0 && (
          area.map((area, index) => (
            <div
              key={index}
              onClick={() => handleClickArea(area)}
              className='py-2 border-b'>
                {area}
              </div>
          ))
        )}
        {selectedFilter === 'CollegeType' && type.length > 0 && (
          type.map((item, index) => (
            <div 
              key={index}
              onClick={() => handleClickCollegeType(item)}
              className='py-2'>
                {item}
              </div>
          ))
        )}
        {selectedFilter === 'Stream' && stream.length > 0 && (
          stream.map((stream, index) => (
            <div
              key={index}
              onClick={() => handleClickStream(stream)}
              className='py-2'>
                {stream}
              </div>
          ))
        )}
        {selectedFilter === 'Status' && streamStatus.length > 0 && (
          streamStatus.map((status, index) => {
            <div
              key={index}
              onClick={() => handleClickStatus(status)}
              className='py-2'>
                {status}
              </div>
          })
        )}
        {selectedFilter === 'Medium' && medium.length > 0 && (
          medium.map((medium, index) => (
            <div
              key={index}
              onClick={() => handleClickMedium(medium)}
              className='py-2'>
                {medium}
              </div>
          ))
        )}
      </div>
      <div className='flex justify-between mt-4'>
        <button onClick={() => dispatch(clearTrack())} className='px-4 py-2 bg-gray-200 rounded'>Clear</button>
        <button onClick={handleApply} className='px-4 py-2 bg-orange-400 rounded'>Apply</button>
      </div>
    </div>
  );
}

export default QueryData;
