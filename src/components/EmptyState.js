import React from 'react';

/**
 * EmptyState component.
 * Renders a message when there are no items to display.
 *
 * @param {string} item - The type of item (e.g., "users", "prompts").
 */
const EmptyState = ({ item }) => {
  return (
    <section className="h-full w-full px-4 py-4 mx-auto lg:px-12">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-500 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v4M12 16h.01"></path>
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No {item} to display</h3>
        <p className="mt-1 text-sm font-medium text-gray-500">No {item} were found. Please add some {item}.</p>
      </div>
    </section>
  );
};

export default EmptyState;