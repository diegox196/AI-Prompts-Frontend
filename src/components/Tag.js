import React from 'react';

const Tag = ({ text, handleDelete }) => {

  return (
    <div
      className="my-[5px] p-1 mr-3 flex items-center justify-between rounded-[16px] bg-blue-500/20 font-normal text-white">
      <span className="px-3 uppercase text-xs font-bold"> {text} </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        className="h-6 w-6 opacity-40 cursor-pointer"
        onClick={handleDelete}>
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
      </svg>
    </div>
  );
};

export default Tag;