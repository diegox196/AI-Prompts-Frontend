import React from 'react';

const SkeletonPlayPrompt = () => {
  return (
    <div className="w-full max-w-screen-xl px-4 py-4 mx-auto lg:px-12 animate-pulse">

      <div className="p-7 bg-white rounded-lg shadow dark:bg-gray-800 lg:py-6 lg:px-12">

        <div className="flex justify-between items-center rounded-t sm:mb-5 dark:border-gray-600 py-4">
          <div className="h-9 bg-gray-200 rounded-lg dark:bg-gray-700 w-2/4"></div>
        </div>

        <div className="flex items-center mb-4">
          <div className="h-4 mr-4 bg-gray-200 rounded-lg dark:bg-gray-700 w-full md:w-[111.55px]"></div>
          <div className="h-6 bg-blue-200 w-14 rounded"></div>
        </div>

        <div className="pb-4">
          <div className="block h-4 mb-2 bg-gray-200 rounded-lg dark:bg-gray-700 md:w-[111.55px]"></div>
          <div className="h-4 mb-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-48"></div>
        </div>

        <div className="pb-4">
          <div className="block h-4 mb-2 bg-gray-200 rounded-lg dark:bg-gray-700 md:w-[111.55px]"></div>
          <div className="h-4 mb-3 bg-gray-200 rounded-lg dark:bg-gray-700 w-48"></div>
        </div>


        <div className="flex space-x-4 pb-6">
          <div className="block h-9 mb-2 bg-gray-200 rounded-lg dark:bg-blue-700 w-24"></div>
          <div className="block h-9 mb-2 bg-gray-200 rounded-lg dark:bg-gray-700 w-24"></div>
        </div>

        
        <div className="block h-44 mb-2 bg-gray-200 rounded-lg dark:bg-gray-700 w-full"></div>

      </div>

      <span className="sr-only">Loading...</span>

    </div>
  );
};

export default SkeletonPlayPrompt;