import axios from 'axios';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Alert from '../components/Alert';

/**
 * Signup page for user registration
 * @returns {JSX.Element} The signup page component.
 */
const Signup = () => {
  // State to manage form data, confirm password, error message, and saved user state
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    active: false,
    role: "user"
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSavedUser, setIsSavedUser] = useState(false);

  /**
   * Function to handle form input changes.
   * @param {Object} event - The event object.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  /**
   * Function to create a new user
   * 
   * @param {Object} newData - The new user data
   * @returns {Object} - The response data or error
   */
  const createNewUser = async (newData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URI}/api/account/register`, newData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  /**
   * Function to handle form submission.
   * @param {Object} event - The event object.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate empty fields
    const isEmptyField = Object.values(formData).some((value) => value === "");
    if (isEmptyField) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    // Validate passwords
    if (formData.password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const isSaved = await createNewUser(formData);
    if (isSaved.error) {
      setErrorMessage(isSaved.error);
    } else {
      setIsSavedUser(true);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <form onSubmit={handleSubmit} className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-12">

          <div className="pb-8 dark:border-white">
            <h2 className=" text-lg font-semibold leading-7 text-gray-900 dark:text-white">Sign Up</h2>

            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required=""
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="first_name"
                    placeholder="First Name"
                    required=""
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Last Name"
                    required=""
                    autoComplete="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required=""
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <p className="block text-sm leading-6 text-gray-900 dark:text-gray-400 p-1">
                  An email will be sent to this address to validate and activate the account.
                </p>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required=""
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="repeat_password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="repeat_password"
                    name="repeat_password"
                    type="password"
                    placeholder="Confirm password"
                    required=""
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {errorMessage !== '' && <Alert type={"Danger"} message={errorMessage} />}

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link to={"/"} type="button" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Save
          </button>
          {isSavedUser && <Navigate to={"/"} replace={true} />}
        </div>
      </form>
    </div>
  );
};

export default Signup;