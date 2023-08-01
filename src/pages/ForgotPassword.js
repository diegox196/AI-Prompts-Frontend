import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        "email": email
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URI}/api/account/forgot-password-email`, body);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex min-h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex items-center mb-6">
          <img
            className="mx-auto h-10 w-auto"
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Your Company"
          />
        </div>

        <h1 className="mb-4 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Password Reset
        </h1>
        <p className="font-light text-gray-500 dark:text-gray-400">We'll send you an email with your username and a link to reset your password.</p>
        <form className="mt-4 lg:mt-5 space-y-10" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Your email</label>
            <div className="mt-2">
              <input type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-0 px-2 py-1.5 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required="" />
            </div>
          </div>
          <button
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit">Send</button>
        </form>
        <Link to={"/"} className="block mt-4 w-full py-2.5 px-5 mr-2 mb-2 text-sm text-center font-medium text-gray-900 focus:outline-none hover:text-blue-700 focus:z-10 dark:text-gray-400 dark:hover:text-white">
          Back
        </Link>
      </div>
    </section>
  );
};

export default ForgotPassword;