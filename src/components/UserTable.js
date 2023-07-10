import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserTable({ handleClick }) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/user`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`
        }
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="w-full max-w-screen-xl px-4 py-4 mx-auto lg:px-12">
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full bg-white dark:bg-gray-800 dark:text-white">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 dark:text-gray-100">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody  >
            {userData.map(user => (
              <tr key={user._id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="py-2 px-4 text-center">{`${user.first_name} ${user.last_name}`}</td>
                <td className="py-2 px-4 text-center">{user.email}</td>
                <td className="py-2 px-4 text-center">
                  <span
                    className={`pb-0.5 px-1.5 rounded-lg text-sm font-medium ${user.active
                      ? 'bg-green-100 text-green-800 dark:text-green-100 dark:bg-green-800'
                      : 'bg-yellow-100 text-yellow-800 dark:text-yellow-100 dark:bg-yellow-800'
                      }`}
                  >
                    {user.active ? 'Active' : 'Pending'}
                  </span>
                </td>
                <td className="py-2 px-4 text-center">
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
  );
}

export default UserTable;