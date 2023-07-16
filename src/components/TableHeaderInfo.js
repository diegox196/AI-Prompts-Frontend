import React from 'react';

/**
 * TableHeaderInfo component.
 * Renders the header section of the table with information about the type (e.g., Users, Prompts)
 * and a button to add a new item of that type.
 *
 * @param {string} type - The type of items (e.g., "user", "prompt").
 * @param {function} setTypeAction - Function to set the type of action.
 * @param {function} goAllData - Function to navigate back to all data view.
 */
const TableHeaderInfo = ({ type, setTypeAction, goAllData }) => {

  /**
   * Handles the creation of a new item.
   * Sets the `goAllData` state to false and updates the `setTypeAction` state to "Add new".
   */
  const handleCreate = () => {
    goAllData(false);
    setTypeAction("Add new");
  }

  return (
    <section className="w-full max-w-screen-xl px-4 py-4 mx-auto lg:px-12">
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 rounded-lg">
        <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
          <div>
            <h1 className="text-lg mr-3 font-semibold dark:text-white">{`${type.charAt(0).toUpperCase()}${type.slice(1)}s`}</h1>
            <p className="text-gray-500 dark:text-gray-400">{`Manage all your existing ${type}s or add a new one`}</p>
          </div>
          <button type="button" onClick={handleCreate}
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2 -ml-1" viewBox="0 0 20 20" fill="currentColor"
              aria-hidden="true">
              <path
                d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
            {`Add new ${type}`}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TableHeaderInfo;