import React from 'react';
import { useSelector } from 'react-redux';

function CollegeBasicCutOffdetails() {
  const { cutOffInfo, loadingCutOff, error } = useSelector((state) => state.collegeInfo);

  if (loadingCutOff) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cutOffInfo || !cutOffInfo.streams || cutOffInfo.streams.length === 0) {
    return <div>No cutoff data available</div>;
  }

  return (
    <div className='max-w-6xl overflow-x-auto mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
      <div className='p-8 text-center'>
        <div className='uppercase tracking-wide text-lg text-indigo-500 font-semibold mb-4'>College Cutoff Details</div>
      </div>
      <div className='bg-gray-100 p-5 rounded-md'>
        <table className='min-w-full bg-white border border-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              {['Serial No.', 'Stream', 'Code', 'Status', 'Year'].map((header) => (
                <th key={header} className='px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-200 text-center'>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cutOffInfo.streams.map((data, index) => (
              <tr key={index} className='bg-gray-50'>
                {[index + 1, data.streamName, data.streamCode, data.status, data.year].map((item, idx) => (
                  <td key={idx} className='px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-900'>
                    {item}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CollegeBasicCutOffdetails;
