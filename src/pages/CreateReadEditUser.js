import React, { useEffect, useState } from 'react';
import UserForm from '../components/UserForm';
import axios from 'axios';

/**
 * CreateReadEditUser page.
 * Renders a form for creating, reading, or editing user data.
 *
 * @param {string} action - The type of action to perform (e.g., "Add new", "Edit", "View").
 * @param {string} userId - The ID of the user being edited.
 * @param {function} goAllUsers - Function to go back to displaying all users.
 */
const CreateReadEditUser = ({ action, userId, goAllUsers }) => {
  let initData = {
    "email": "",
    "username": "",
    "password": "",
    "first_name": "",
    "last_name": "",
    "active": false,
    "role": "user",
  };

  const [userData, setUserData] = useState(initData);

  useEffect(() => {
    const getUserData = async () => {
      if (action === "Edit") {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("auth")}`
            }
          });
          setUserData(response.data);
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      } else {
        setUserData(initData);
      }
    };

    getUserData();
  }, [userId]);

  /**
   * Updates a user with new data.
   *
   * @param {object} newData - The updated user data.
   * @returns {object} - The updated user data or an error response.
   */
  const updateNewUser = async (newData) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URI}/api/user/${newData._id}`, newData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`
        }
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  /**
   * Creates a new user with the provided data.
   *
   * @param {object} newData - The data of the new user.
   * @returns {object} - The created user data or an error response.
   */
  const createNewUser = async (newData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URI}/api/user`, newData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  /**
   * Handles the save action for the user data.
   *
   * @param {object} newData - The updated user data or new user data.
   * @returns {object} - The updated or created user data, or an error response.
   */
  const handleSave = async (newData) => {
    if (action === "Edit") {
      return await updateNewUser(newData);
    } else {
      return await createNewUser(newData);
    }
  };

  return (
    userData && <UserForm type={action} userData={userData} handleSave={handleSave} goAllUsers={goAllUsers} />
  );
};

export default CreateReadEditUser;