import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifiedAccount = () => {
  const navigate = useNavigate();

  const activateAccount = async (token) => {
    try {
      const body = {
        "auth_token": token
      };
      const codeData = await axios.post(`${process.env.REACT_APP_API_URI}/api/account/verify-email`, body);
      console.log(codeData.data);
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('verify_token');
    activateAccount(token);
  }, []);

  const handleOnClick = () => {
    navigate("/");
  }

  return (
    <section className='flex min-h-[90vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className="flex flex-col  items-center sm:mx-auto sm:w-full sm:max-w-sm">
        <svg aria-hidden="true" className="w-12 h-12 mb-4 text-emerald-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"></path>
        </svg>
        <h1 className="text-gray-900 dark:text-white font-bold mb-2 tracking-tight text-2xl">Verified</h1>
        <p className="mb-8 text-lg font-normal text-gray-600 dark:text-gray-400">You have successfully verified your account.</p>
        <button
          type="button"
          onClick={handleOnClick}
          className=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Log in to your Account
        </button>

      </div>
    </section>
  );
};

export default VerifiedAccount;