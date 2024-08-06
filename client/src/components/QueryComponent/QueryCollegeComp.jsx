import React, { useState } from 'react';
import axiosInstance from '../../api/AxiosInstance';

function QueryCollegeComp() {
    const [region, setRegion] = useState(['Mumbai', 'Pune', 'Nashik', 'Nagpur']);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [zones, setZones] = useState([]);
    const [selectedZone, setSelectedZone] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchZonesByRegion = async (region) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/search/get-by-region?region=${region}`);
            setZones(response.data.zone);
            setError('');
        } catch (error) {
            setError('Error fetching zones. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchCityByZone = async (region, zone) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/search/get-by-zone?region=${region}&zone=${zone}`);
            setCities(response.data);
            setError('');
        } catch (error) {
            setError('Error fetching cities. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegionChange = (event) => {
        const region = event.target.value;
        setSelectedRegion(region);
        setSelectedZone('');
        setCities([]);
        setSelectedCity('');
        if (region) {
            fetchZonesByRegion(region);
        }
    };

    const handleZoneChange = (event) => {
        const zone = event.target.value;
        setSelectedZone(zone);
        setSelectedCity('');
        if (zone) {
            fetchCityByZone(selectedRegion, zone);
        }
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/search/colleges/filter`, { params: { region: selectedRegion, zone: selectedZone, city: selectedCity } });
            console.log(response.data);
            setError('');
        } catch (error) {
            setError('Error fetching colleges. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resetFilters = () => {
        setSelectedRegion('');
        setSelectedZone('');
        setSelectedCity('');
        setCities([]);
        setZones([]);
    };

    return (
        <div className="p-4 bg-white shadow-lg rounded-md">
            <h2 className="text-lg font-semibold mb-4">Search Colleges</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">Region</label>
                    <select id="region" value={selectedRegion} onChange={handleRegionChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="">Select a region</option>
                        {region.map((region) => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="zone" className="block text-sm font-medium text-gray-700">Zone</label>
                    <select id="zone" value={selectedZone} onChange={handleZoneChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="">Select a zone</option>
                        {zones.map((zone) => (
                            <option key={zone} value={zone}>{zone}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <select id="city" value={selectedCity} onChange={handleCityChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="">Select a city</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                {/* Add more fields here similar to the above fields */}
            </div>
            <div className="flex justify-end mt-4">
                <button onClick={handleSearch} disabled={loading} className="px-4 py-2 bg-green-500 text-white rounded-md mr-2">
                    {loading ? 'Searching...' : 'Search'}
                </button>
                <button onClick={resetFilters} className="px-4 py-2 bg-red-500 text-white rounded-md">
                    Reset
                </button>
            </div>
        </div>
    );
}

export default QueryCollegeComp;
