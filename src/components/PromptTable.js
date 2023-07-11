import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmptyState from './EmptyState';

function PromptTable({ handleClick }) {

  const [promptData, setPromptData] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    const getPromptsByUserID = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/prompt/user/${user.user_id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth")}`
          }
        });
        setPromptData(response.data);
        setIsEmpty(response.data.length === 0);
      } catch (error) {
        console.error('Error fetching prompt data:', error);
        setIsEmpty(true);
      }
    };

    getPromptsByUserID();
  }, []);

  return (
    <>
      {isEmpty && <EmptyState item={"users"} />}
      {promptData &&
        <div className="w-full max-w-screen-xl px-4 py-4 mx-auto lg:px-12">
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full bg-white dark:bg-gray-800 dark:text-white">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700 dark:text-gray-100">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Type</th>
                  <th className="py-2 px-4">Tags</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody  >
                {promptData.map(prompt => (
                  <tr key={prompt._id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="py-2 px-4 text-center">{prompt.name}</td>
                    <td className="py-2 px-4 text-center">{prompt.type}</td>
                    <td className="py-2 px-4 text-center">
                      <span
                        className={`pb-0.5 px-1.5 rounded-lg text-sm font-medium ${prompt.tag
                          ? 'bg-green-100 text-green-800 dark:text-green-100 dark:bg-green-800'
                          : 'bg-yellow-100 text-yellow-800 dark:text-yellow-100 dark:bg-yellow-800'
                          }`}
                      >
                        {prompt.tag}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-center">
                      <button className="text-blue-500 mr-2" onClick={() => handleClick("View", prompt._id)}>
                        View
                      </button>
                      <button className="text-blue-500 mr-2" onClick={() => handleClick("Edit", prompt._id)}>
                        Edit
                      </button>
                      <button className="text-blue-500" onClick={() => handleClick("Delete", prompt._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    </>
  );
}

export default PromptTable;