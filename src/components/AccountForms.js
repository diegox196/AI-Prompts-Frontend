import React, { useEffect, useState } from 'react';
import Alert from './Alert';
import axios from 'axios';
import LoadingButton from './LoadingButton';

const AccountForms = () => {

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

  const initPassword = {
    current_password: "",
    new_password: "",
    confirm_password: "",
  };

  const [userData, setUserData] = useState(initData);
  const [changePassword, setChangePassword] = useState(initPassword);
  const [name, setName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessagePreferences, setErrorMessagePreferences] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPreferences, setIsLoadingPreferences] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);

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

  /**
   * Updates a user password with new data.
   *
   * @param {object} body - The updated user data.
   * @returns {object} - The updated user data or an error response.
   */
  const updateUserPassword = async (body) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URI}/api/users/${user.user_id}/update-password`, body, {
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

  const handleSubmitGeneralInformation = async (e) => {
    e.preventDefault();
    const body = {
      username: userData.username,
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone_number: userData.phone_number
    };

    setIsLoading(true);
    const isSaved = await updateDataUser(body);
    setIsLoading(false);

    console.log(isSaved);

    if (isSaved.error) {
      setErrorMessage(isSaved.error);
    } else {
      setName(`${isSaved.first_name} ${isSaved.last_name}`);
    }
  };

  const handleSubmitPreferences = async (e) => {
    e.preventDefault();
    const body = {
      two_factor_enabled: userData.two_factor_enabled
    };

    setIsLoadingPreferences(true);
    const isSaved = await updateDataUser(body);
    setIsLoadingPreferences(false);

    console.log(isSaved);

    if (isSaved.error) {
      setErrorMessagePreferences(isSaved.error);
    }
  };

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();
    const body = {
      current_password: changePassword.current_password,
      new_password: changePassword.new_password,
      confirm_password: changePassword.confirm_password
    };

    setErrorMessagePassword('');

    setIsLoadingPassword(true);
    const isSaved = await updateUserPassword(body);
    setIsLoadingPassword(false);

    if (isSaved.error) {
      setErrorMessagePassword(isSaved.error);
    } else {
      setChangePassword(initPassword);
    }
  };

  return (
    <div className="w-full max-w-screen-xl px-4 py-4 mx-auto lg:px-12">
      <div className="col-span-full mb-4">
        <h1 className="text-2xl font-semibold text-black dark:text-white">Account Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">

        <section className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 mb-4 col-span-1">
          <div className="flex flex-col justify-center items-center">
            <h3 className=" mb-4 text-xl font-bold text-black dark:text-white">{name}</h3>
            <svg className="mb-4 h-28 w-28 p-4 rounded-lg bg-gray-300 dark:bg-gray-500 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 14 18">
              <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            <p className="font-semibold text-gray-600 dark:text-gray-300 mb-4">{userData.email}</p>
            <button className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="mr-2 -ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path><path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path></svg>
              Change picture
            </button>
          </div>
        </section>

        <section className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 mb-4 col-span-2">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">General information</h3>
          <form onSubmit={handleSubmitGeneralInformation}>
            {errorMessage !== '' && <Alert type={"Danger"} message={errorMessage} />}
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  required
                  value={userData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="First name"
                  required
                  value={userData.first_name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Last name"
                  required
                  value={userData.last_name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                <input
                  type="phone"
                  name="phone_number"
                  id="phone_number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="88558855"
                  required
                  value={userData.phone_number}
                  onChange={handleChange}
                />
              </div>

            </div>
            <div className="flex space-x-4">
              <LoadingButton isLoading={isLoading} btnText={"Save All"} />
            </div>
          </form>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
        <section className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 mb-4">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">Preferences</h3>
          <form onSubmit={handleSubmitPreferences}>
            {errorMessagePreferences !== '' && <Alert type={"Danger"} message={errorMessagePreferences} />}
            <div className="flex items-center justify-between py-4">
              <div className="flex flex-col grow px-2">
                <p className="text-lg font-semibold text-black dark:text-white">Two-factor authtentication</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Add an extra layer of security to your account by request access to your phone when your log in
                </p>
              </div>
              <label htmlFor="two_factor_enabled" className="relative inline-flex items-center mb-4 cursor-pointer">
                <input type="checkbox"
                  id="two_factor_enabled"
                  name="two_factor_enabled"
                  onChange={handleChange}
                  className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-4 border-t-2 border-gray-300 dark:border-gray-500">
              <div className="flex flex-col grow px-2">
                <p className="text-lg font-semibold text-black dark:text-white">Dark Mode</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                  When you activate this option, the interface transforms into soothing dark tones, reducing exposure to intense light and protecting your eyes in low-light environments
                </p>
              </div>
              <label htmlFor="dark_mode" className="relative inline-flex items-center mb-4 cursor-pointer">
                <input type="checkbox"
                  id="dark_mode"
                  value=""
                  className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex space-x-4 mt-4">
              <LoadingButton isLoading={isLoadingPreferences} btnText={"Save All"} />
            </div>
          </form>
        </section>

        <section className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 mb-4">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">Change Password</h3>
          <form onSubmit={handleSubmitChangePassword}>
            {errorMessagePassword !== '' && <Alert type={"Danger"} message={errorMessagePassword} />}
            <div>
              <label htmlFor="current_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
              <input
                type="password"
                name="current_password"
                id="current_password"
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required
                value={changePassword.current_password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="new_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
              <input
                type="password"
                name="new_password"
                id="new_password"
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required
                value={changePassword.new_password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required
                value={changePassword.confirm_password}
                onChange={handleChange}
              />
            </div>

            <div className="flex space-x-4">
              <LoadingButton isLoading={isLoadingPassword} btnText={"Save All"} />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AccountForms;