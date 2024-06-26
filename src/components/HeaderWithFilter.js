import React, { useEffect, useState } from 'react';
import FilterMenu from './FilterMenu';
import axios from 'axios';

/**
 * HeaderWithFilter component.
 * Renders the header section with search and filter options, along with the result count.
 *
 * @param {number} nResult - The number of results to display.
 */
const HeaderWithFilter = ({ userId, getPromptsByUserID, searchUserPromptsByName, searchUserPromptsByTag }) => {

  const title = "Tags";
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getPromptsByUserID = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/prompts/user/${userId}/tags`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth")}`
          }
        });

        setOptions(response.data);
      } catch (error) {
        console.error('Error fetching prompt data:', error);
      }
    };

    getPromptsByUserID();
  }, []);

  const onClickFilterMenu = (item) => {
    const body = {
      query: `
        {
          searchUserPromptsByTag(user_id: "${userId}" tag: "${item}"){
            _id
            type
            name
            tags
          }
        }
      `,
    }
    searchUserPromptsByTag(body);
  };

  const restartPrompts = () => {
    setSearch("");
    getPromptsByUserID();
  }

  const onSubmitSearch = (e) => {
    e.preventDefault();
    const body = {
      query: `
        {
          searchUserPromptsByName(user_id: "${userId}" name: "${search}"){
            _id
            type
            name
            tags
          }
        }
      `,
    };
    searchUserPromptsByName(body);

  }

  return (
    <section className="flex items-center">
      <div className="w-full">

        <div className="relative">
          <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">

            <div className="w-full md:w-1/2 lg:w-1/3">
              <form className="flex items-center" onSubmit={onSubmitSearch}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>

                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>

                  <input
                    className="block w-full p-2 pl-10 text-sm text-gray-900 placeholder:text-gray-600 border focus:outline-none border-gray-200 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-600 dark:focus:border-gray-600"
                    type="search"
                    id="default-search"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoComplete='off'
                    required />
                  <button type="submit"
                    className="text-white absolute right-0 bottom-px bg-blue-700 hover:bg-blue-800 outline-none font-medium rounded-lg text-sm px-3 py-2 dark:bg-gray-500 dark:hover:bg-gray-500/80">Search</button>
                </div>

              </form>
            </div>

            <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
              <button type="button"
                onClick={restartPrompts}
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="none">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97" />
                </svg>
                Reset all
              </button>
              <FilterMenu title={title} options={options} onClick={onClickFilterMenu} />
            </div>

          </div>
        </div>
      </div>
    </section >
  );
};

export default HeaderWithFilter;