import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromParams = urlParams.get('auth_token');

    if (tokenFromParams) {
      setToken(tokenFromParams);
    };
  }, []);

  const changePassword = async () => {
    try {
      const body = {
        "password": password
      };

      const codeData = await axios.patch(`${process.env.REACT_APP_API_URI}/api/accounts/${token}/reset-password`, body);
      if(codeData.status){
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      changePassword();
    } else {
      setError("Password do not match");
    }

  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          {error && <Alert type={"Danger"} message={error} />}
          <form className="mt-4 space-y-6 lg:mt-5 md:space-y-8" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset passwod</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;