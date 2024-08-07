import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '../../store/regionSlice';
import { addToTrack, fetchZonesByRegion, removeFromTrack, setTrack } from '../../store/CollegeQuerySlice';
import { setShowQuery } from '../../store/UiCollegeQuerySlice';


function QueryData() {
  const selectedFilter = useSelector((state) => state.uiCollQuery.selectedFilter);
  const { filteredRegions, searchTerm,} = useSelector((state) => state.regions);
  const {zones, loadingZone} = useSelector((state) => state.collegeQuery);
  const {track} = useSelector((state) => state.collegeQuery)
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  }

  const handleClickRegion = (region) => {
    if(track.includes(region)){
      dispatch(removeFromTrack(region))
    }else{
      dispatch(addToTrack(region))
    }
  };

  const handleClickZone = (zone) => {
    if(track.includes(zone)){
      dispatch(removeFromTrack(zone))
    }else{
      dispatch(addToTrack(zone))
    }
  }

  const handleApply = () => {
    track.forEach(region => {
      dispatch(fetchZonesByRegion(region));
    });
    dispatch(setShowQuery(false));
  }
  
  if(loadingZone) return <div>loading...</div>
  console.log(zones);
  

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
              onClick={() => handleClickRegion(region)}>
                {region}
              </div>
          ))
        )}
        {selectedFilter === 'Zone' && zones.length > 0 && (
          zones.map((zone, index) => (
            <div
              key={index}
              onClick={() => handleClickZone(zone)}
              className='py-2 border-b'>
                {zone}
              </div>
          ))
        )}
      </div>
      <div className='flex justify-between mt-4'>
        <button className='px-4 py-2 bg-gray-200 rounded'>Clear</button>
        <button onClick={handleApply} className='px-4 py-2 bg-orange-400 rounded'>Apply</button>
      </div>
    </div>
  )
}

export default QueryData
