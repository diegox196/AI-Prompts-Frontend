import React, { useState } from 'react';
import LoadingButton from '../LoadingButton';
import Alert from '../Alert';
import axios from 'axios';

const ChangePasswordSection = ({ user, handleChange, showToastSaved }) => {

  const initPassword = {
    current_password: "",
    new_password: "",
    confirm_password: "",
  };

  const [changePassword, setChangePassword] = useState(initPassword);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();
    const body = {
      current_password: changePassword.current_password,
      new_password: changePassword.new_password,
      confirm_password: changePassword.confirm_password
    };

    setErrorMessage('');

    setIsLoading(true);
    const isSaved = await updateUserPassword(body);
    setIsLoading(false);

    if (isSaved.error) {
      setErrorMessage(isSaved.error);
    } else {
      setChangePassword(initPassword);
      showToastSaved();
    }
  };

  return (
    <section className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 mb-4">
      <h3 className="mb-4 text-xl font-bold text-black dark:text-white">Change Password</h3>
      <form onSubmit={handleSubmitChangePassword}>
        {errorMessage !== '' && <Alert type={"Danger"} message={errorMessage} />}
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
          <LoadingButton isLoading={isLoading} btnText={"Save All"} loadingText={"Saving..."} />
        </div>
      </form>
    </section>
  );
};

export default ChangePasswordSection;