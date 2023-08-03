import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmptyState from './EmptyState';

/**
 * UserTable component.
 * Renders a table with user data, including name, email, status, and actions.
 *
 * @param {function} handleClick - Function to handle the click events on the actions buttons.
 */
const UserTable = ({ handleClick }) => {
  const [userData, setUserData] = useState(null); // State to store the user data
  const [isEmpty, setIsEmpty] = useState(false); // State to check if the user data is empty

  useEffect(() => {
    getUsersData();
  }, []);

  /**
   * Retrieves user data from the API.
   * Sets the `userData` state with the retrieved data.
   * Checks if the retrieved data is empty and updates the `isEmpty` state accordingly.
   */
  const getUsersData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/users`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`
        }
      });

      const dataLength = response.data.length;
      const value = (dataLength === 0) ? null : response.data;
      setUserData(value);
      setIsEmpty(dataLength === 0);
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsEmpty(true);
    }
  };

  return (
    <>
      {isEmpty && <EmptyState item={"users"} />}
      {userData &&
        <div className="w-full max-w-screen-xl px-4 py-4 mx-auto lg:px-12">
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full bg-white dark:bg-gray-800 dark:text-white">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 dark:text-gray-100">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userData.map(user => (
                  <tr key={user._id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 text-center">{`${user.first_name} ${user.last_name}`}</td>
                    <td className="py-3 px-4 text-center">{user.email}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="flex items-center justify-center text-sm font-medium text-gray-900 dark:text-white">
                        <span className={`flex w-2.5 h-2.5 rounded-full mr-1.5 flex-shrink-0 ${user.active
                          ? 'bg-green-600'
                          : 'bg-yellow-600'
                          }`}>
                        </span>
                        {user.active ? 'Active' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="text-blue-500 mr-2" onClick={() => handleClick("View", user._id)}>
                        View
                      </button>
                      <button className="text-blue-500 mr-2" onClick={() => handleClick("Edit", user._id)}>
                        Edit
                      </button>
                      <button className="text-blue-500" onClick={() => handleClick("Delete", user._id)}>
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

export default UserTable;