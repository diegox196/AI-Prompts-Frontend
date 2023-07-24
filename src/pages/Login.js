import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import LoadingButton from '../components/LoadingButton';

/**
 * Login screen displays a login form for users to sign in to their account.
 * 
 * @param {Object} handleLogin - Function to handle the login process
 */
const Login = ({ handleLogin }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URI}/api/sessions`, formData);
      handleLogin(response.data.tokenSession);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (err) {
      setError(err.response ? err.response.data.error : err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://flowbite.com/docs/images/logo.svg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && (
          <Alert type={"Danger"} message={error} />
        )}
        <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <LoadingButton isLoading={isLoading} btnText={"Sign in"} fullWidth={true} />
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          If you don&rsquo;t have an account{' '}
          <Link to={'/signup '} className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;