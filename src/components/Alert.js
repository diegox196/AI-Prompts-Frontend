import React from 'react';

/**
 * The alert component can be used to provide information to your users
 * @param {string} type Info - Danger - Success - Warning - Dark
 */
const Alert = (type, message) => {

  const color = ""

  switch (type) {
    case 'Info':
      color = 'blue';
      break;
    case 'Danger':
      color = 'red';
      break;
    case 'Success':
      color = 'green';
      break;
    case 'Warning':
      color = 'yellow';
      break;
    case 'Dark':
      color = 'gray';
      break;
    default:
      color = 'gray';
      break;
  }

  return (
    <div class={`p-4 mb-4 text-sm text-${color}-800 rounded-lg bg-${color}-50 dark:bg-gray-800 dark:text-${color}-400`} role="alert">
      {message}
    </div>
  );
};

export default Alert;