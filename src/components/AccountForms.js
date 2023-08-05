import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Toast from './Toast';
import UserProfileSection from './AccountForm/UserProfileSection';
import GeneralInformationSection from './AccountForm/GeneralInformationSection';
import PreferenceSection from './AccountForm/PreferenceSection';
import ChangePasswordSection from './AccountForm/ChangePasswordSection';

const AccountForms = ({ name, setName }) => {

  const initData = {
    email: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    two_factor_enabled: false,
    active: false,
    role: "user",
  };

  const [userData, setUserData] = useState(initData);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const user = JSON.parse(sessionStorage.getItem('user'));

  // Update the userData state when user data changes
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/users/${user.user_id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth")}`
          }
        });
        const newData = response.data;
        setUserData(newData);
        setName(`${newData.first_name} ${newData.last_name}`);
      } catch (error) {
        console.log(error);
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    getUserData();
  }, []);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    if (type === 'password') {
      setChangePassword((prevData) => ({
        ...prevData,
        [name]: value
      }));
    } else {

      const newValue = (type === 'checkbox') ? checked : value;

      setUserData((prevData) => ({
        ...prevData,
        [name]: newValue
      }));
    }
  };

  /**
   * Updates a user with new data.
   *
   * @param {object} body - The updated user data.
   * @returns {object} - The updated user data or an error response.
   */
  const updateDataUser = async (body) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URI}/api/users/${user.user_id}`, body, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`
        }
      });
      setUserData(response.data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const showToastSaved = () => {
    setIsSuccessful(true);
    // After 3 seconds, set setIsSaved to false
    setTimeout(() => {
      setIsSuccessful(false);
    }, 3000);
  };

  const onCloseToast = () => {
    setIsSuccessful(false);
  };

  return (
    <div className="w-full max-w-screen-xl px-4 py-4 mx-auto lg:px-12">
      {isSuccessful && <Toast message={"Account settings successfully updated"} onClose={onCloseToast} />}
      <div className="col-span-full mb-4">
        <h1 className="text-2xl font-semibold text-black dark:text-white">Account Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
        <UserProfileSection name={name} email={userData.email} />
        <GeneralInformationSection userData={userData} handleChange={handleChange}
          updateDataUser={updateDataUser} showToastSaved={showToastSaved} setName={setName} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
        <PreferenceSection userData={userData} handleChange={handleChange} showToastSaved={showToastSaved} updateDataUser={updateDataUser} />
        <ChangePasswordSection handleChange={handleChange} showToastSaved={showToastSaved} />
      </div>
    </div>
  );
};

export default AccountForms;