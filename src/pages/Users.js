import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/user`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  const handleNewUser = () => {
    console.log(`New User`);
  };

  const handleView = (userId) => {
    console.log(`View user with ID: ${userId}`);
  };

  const handleEdit = (userId) => {
    console.log(`Edit user with ID: ${userId}`);
  };

  const handleDelete = (userId) => {
    console.log(`Delete user with ID: ${userId}`);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-3xl font-bold">User</h1>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handleNewUser}>
          New
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map(user => (
              <tr key={user._id} className="border-t border-gray-200">
                <td className="py-2 px-4">{`${user.first_name} ${user.last_name}`}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 text-center">
                  <span
                    className={`py-1 px-2 rounded ${
                      user.active ? 'border border-green-500 bg-green-100 text-green-500' : 'border border-yellow-500 bg-yellow-100 text-yellow-500'
                    }`}
                    style={{ borderRadius: '10px' }}
                  >
                    {user.active ? 'Active' : 'Pending'}
                  </span>
                </td>
                <td className="py-2 px-4 text-center">
                  <button className="text-blue-500 mr-2" onClick={() => handleView(user._id)}>
                    View
                  </button>
                  <button className="text-blue-500 mr-2" onClick={() => handleEdit(user._id)}>
                    Edit
                  </button>
                  <button className="text-blue-500" onClick={() => handleDelete(user._id)}>
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

export default Users;