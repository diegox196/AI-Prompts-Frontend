import React from 'react';

const UserProfileSection = ({ name, email }) => {
  return (
    <section className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 mb-4 col-span-1">
      <div className="flex flex-col justify-center items-center">
        <h3 className=" mb-4 text-xl font-bold text-black dark:text-white">{name}</h3>
        <svg className="mb-4 h-28 w-28 p-4 rounded-lg bg-gray-300 dark:bg-gray-500 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 18">
          <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
        </svg>
        <p className="font-semibold text-gray-600 dark:text-gray-300 mb-4">{email}</p>
        <button className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="mr-2 -ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path><path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path></svg>
          Change picture
        </button>
      </div>
    </section>
  );
};

export default UserProfileSection;