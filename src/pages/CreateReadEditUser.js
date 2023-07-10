import React, { useEffect, useState } from 'react';
import UserForm from '../components/UserForm';
import axios from 'axios';

/**
   * Controls the actions of view, create and edit
   * 
   * @param {string} type View - Edit - Add new
   * @param {string} id e35e12e5awd5awd
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
      if (userId) {
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
      }
    };

    getUserData();
  }, [userId]);

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

  const createNewUser = async (newData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URI}/api/user`, newData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const handleSave = async (newData) => {
    if (action === "Edit") {
      return await updateNewUser(newData);
    } else {
      return await createNewUser(newData);
    }
  };

  return (
    <>
      <UserForm type={action} userData={userData} handleSave={handleSave} goAllUsers={goAllUsers} />
    </>
  );
};

export default CreateReadEditUser;