import React from 'react';

const ProgressBar = ({ isLoading }) => {
  return (
    <div className="w-full overflow-hidden relative bg-gray-200 h-1.5 dark:bg-gray-700">
      {isLoading && <div className="absolute bg-blue-600 h-2.5 rounded-full w-1/2 animate-indeterminate"></div>}
    </div>
  );
};

export default ProgressBar;