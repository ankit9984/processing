import React from 'react';

function SearchResult({ colleges }) {
  if (colleges.length === 0) {
    return (
      <div className='max-w-3xl mt-4 w-full px-4'>
        <h2 className='text-white text-xl sm:text-2xl font-semibold mb-4 text-center'>No results found</h2>
      </div>
    );
  }

  return (
    <div className='max-w-3xl w-full px-4'>
      <h2 className='text-white text-xl sm:text-2xl font-semibold mb-4 text-center'>Search Results</h2>
      <ul className='space-y-4'>
        {colleges.map((college) => (
          <li key={college._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6 hover:bg-gray-100 transition-colors cursor-pointer">
              <h4 className='text-[15px] sm:text-lg font-bold text-gray-800'>{college.jrCollegeName}</h4>
              <p className='text-sm sm:text-base text-gray-600'>{college.popularName}</p>
              <p className='text-xs sm:text-sm text-gray-500'>
                {college.address?.area}, {college.address?.pinCode}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResult;
