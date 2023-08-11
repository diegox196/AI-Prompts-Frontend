import React from 'react';

const SkeletonTable = ({ numRows, showFilters }) => {

  const generateHeaders = () => {
    return <section className="flex items-center">
      <div className="w-full">

        <div className="relative">
          <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">

            <div className="w-full md:w-1/2 lg:w-1/3">
              <form className="flex items-center">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>

                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>

                  <div className="block w-full h-9 bg-gray-200 rounded-lg dark:bg-gray-700"></div>

                  <div className="absolute right-0 bottom-px h-9 bg-blue-700 rounded-lg dark:bg-gray-500 w-[66.16px]"></div>
                </div>

              </form>
            </div>

            <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
              <div className="h-9 bg-gray-200 rounded-lg dark:bg-gray-700 w-full md:w-[111.55px]"></div>
              <div className="h-9 bg-gray-200 rounded-lg dark:bg-gray-700 w-full md:w-[111.55px]"></div>
            </div>

          </div>
        </div>
      </div>
    </section >
  };

  const generateRows = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        <tr key={i} className="border-t border-gray-200 dark:border-gray-700">
          <td className="py-4 px-4 text-center">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
          </td>
          <td className="py-4 px-4 text-center">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
          </td>
          <td className="py-4 px-4 text-center">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
          </td>
          <td className="py-4 px-4 flex flex-nowrap justify-center items-center">
            <div className="h-2.5 mr-4 bg-blue-200 rounded-full dark:bg-blue-800 w-12"></div>
            <div className="h-2.5 mr-4 bg-blue-200 rounded-full dark:bg-blue-800 w-12"></div>
            <div className="h-2.5 bg-blue-200 rounded-full dark:bg-blue-800 w-12"></div>
          </td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <section role="status" className="animate-pulse w-full max-w-screen-xl px-4 py-4 mx-auto lg:px-12">

      <div className="overflow-x-auto shadow-md rounded-lg bg-white dark:bg-transparent">

        {showFilters && generateHeaders()}

        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-600">
            <tr>
              <th className="py-5 px-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-white w-48"></div>
              </th>
              <th className="py-5 px-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-white w-48"></div>
              </th>
              <th className="py-5 px-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-white w-48"></div>
              </th>
              <th className="py-5 px-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-white"></div>
              </th>
            </tr>
          </thead>

          <tbody>
            {generateRows()}
          </tbody>
        </table>
      </div>

      <span className="sr-only">Loading...</span>

    </section>
  );
};

export default SkeletonTable;