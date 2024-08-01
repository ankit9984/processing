import React from 'react'
import { useSelector } from 'react-redux'

function CollegeAddressInfo() {
    const {collegeAddressInfo, loadingAddressInfo, error} = useSelector((state) => state.collegeInfo);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    

    if(loadingAddressInfo) return <div>Loading...</div>;
    if(error) return <div>Error: {error}</div>
    
  return (
    <div className='max-w-6xl mt-5 overflow-x-auto '>
      <table className='bg-gray-100 p-5 rounded-md'>
        <thead className='bg-gray-50'>
            <tr>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Address</th>
                <th  className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Details</th>
            </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
           {collegeAddressInfo && Object.keys(collegeAddressInfo).map((key) => (
                <tr key={key} className='bg-gray-50'>
                    <td className='px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>{capitalizeFirstLetter(key)}</td>
                    <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>{collegeAddressInfo[key]}</td>
                </tr>
           ))}
        </tbody>
      </table>
    </div>
  )
}

export default CollegeAddressInfo
