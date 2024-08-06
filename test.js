import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/AxiosInstance';

function QueryCollegeComp() {
  const [regions, setRegions] = useState(['Mumbai', 'Pune', 'Nashik', 'Nagpur']);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');

  const fetchZones = async (region) => {
    try {
      const response = await axiosInstance.get(`/search/api/get-by-region?region=${region}`);
      setZones(response.data.zones); // Adjust according to the actual response structure
    } catch (error) {
      console.error('Error fetching zones:', error);
    }
  };

  const handleRegionChange = (event) => {
    const region = event.target.value;
    setSelectedRegion(region);
    fetchZones(region); // Fetch zones when a region is selected
  };

  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };

  useEffect(() => {
    if (selectedRegion) {
      fetchZones(selectedRegion);
    }
  }, [selectedRegion]);

  return (
    <div>
      <div>
        <label htmlFor="region">Select a region:</label>
        <select id="region" value={selectedRegion} onChange={handleRegionChange}>
          <option value="">Select a region</option>
          {regions.map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      {selectedRegion && (
        <div>
          <label htmlFor="zone">Select a zone:</label>
          <select id="zone" value={selectedZone} onChange={handleZoneChange}>
            <option value="">Select a zone</option>
            {zones.map((zone) => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default QueryCollegeComp;
