import React, { useEffect, useState } from 'react';
import UserForm from '../components/UserForm';
import axios from 'axios';


const User = ({ action, userId }) => {
  
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
          const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/user/${userId}`);
          setUserData(response.data);
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      }
    };

    getUserData();
  }, []);

  return (
    <>
      <UserForm type={action} userData={userData}/>
    </>
  );
};

export default User;