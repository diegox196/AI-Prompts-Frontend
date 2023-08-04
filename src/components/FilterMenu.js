import React, { useState } from 'react';

const FilterMenu = ({ title, options, onClick }) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  }

  const handleItemSelected = (item) => {
    onClick(item);
    setIsOpen(false);
  }

  return (
    <div>
      <button id="filterDropdownButton"
        type="button"
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={handleOnClick}>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
        </svg>
        Filter
        <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </button>

      {
        (isOpen && options) &&
        <div id="filterDropdown "
          className="absolute w-[90%] max-h-52 overflow-y-auto right-[5%] mt-2 md:w-48 md:right-4 z-10 p-3 bg-white rounded-lg dark:bg-gray-700 shadow-sm dark:shadow-gray-800 border border-gray-200 dark:border-gray-700">
          <h6 className="mb-3 font-semibold text-gray-900 dark:text-white">
            {title}
          </h6>
          <ul className="text-sm" aria-labelledby="dropdownDefault">
            {options.map((item, index) => (
              <li key={index}
                className="cursor-pointer flex items-center p-1 rounded-md hover:bg-gray-100 hover:dark:bg-gray-600"
                onClick={() => handleItemSelected(item)}>
                <p htmlFor={item} className="ml-2 uppercase text-sm font-medium text-stone-500 dark:text-gray-100">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
};

export default FilterMenu;