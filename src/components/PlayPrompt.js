import React, { useEffect, useState } from 'react';
import Alert from './Alert';
import LoadingButton from './LoadingButton';
import axios from 'axios';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const PlayPrompt = ({ promptData, goAllPrompts }) => {
  const [formData, setFormData] = useState(promptData);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData(promptData);
  }, [promptData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const jsonResponse = {
    "object": "edit",
    "created": 1589478378,
    "choices": [
      {
        "text": "What day of the week is it?",
        "index": 0,
      }
    ],
    "usage": {
      "prompt_tokens": 25,
      "completion_tokens": 32,
      "total_tokens": 57
    }
  }

  const updateResponsePrompt = async () => {

    const newResponse = {
      response: JSON.stringify(jsonResponse)
    }

    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URI}/api/prompt/${formData._id}`, newResponse, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`
        }
      });
      setFormData(response.data);
    } catch (err) {
      const errorMessage = (err.response.data.error) ? err.response.data.error : err;
      setErrorMessage(errorMessage);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Show loading button
    await updateResponsePrompt();
    setIsLoading(false); // Hide loading button
  };

  const viewAllPrompt = () => {
    goAllPrompts(true);
  }

  const verifyJSON = () => {
    return JSON.stringify(formData.response, null, 2)
  }

  return (
    <div className="w-full max-w-screen-xl px-4 py-4 mx-auto lg:px-12">

      <div className="p-7 bg-white rounded-lg shadow dark:bg-gray-800 lg:py-6 lg:px-12">

        <div className="flex justify-between items-center rounded-t sm:mb-5 dark:border-gray-600 py-4">
          <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            <span className="underline decoration-4 decoration-blue-400 dark:decoration-blue-600">{promptData.name}</span>
          </h1>
        </div>

        <h2 className="flex items-center text-1xl font-bold dark:text-white mb-4">Type
          <small className="bg-blue-100 text-blue-800 mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">
            {promptData.type}
          </small>
        </h2>

        <div className="pb-4">
          <h2 className="block mb-2 text-1xl font-bold text-gray-900 dark:text-white">Input</h2>
          <p className="mb-3 text-gray-500 dark:text-gray-400">{formData.input}</p>
        </div>

        <div className="pb-4">
          <h2 className="block mb-2 text-1xl font-bold text-gray-900 dark:text-white">Instruction</h2>
          <p className="mb-3 text-gray-500 dark:text-gray-400">{formData.instruction}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4 pb-6">
            <LoadingButton isLoading={isLoading} btnText={"Run"} />
          </div>

          {errorMessage !== '' && <Alert type={"Danger"} message={errorMessage} />}

          <div className="mb-3 dark:bg-gray-700 rounded-xl">
            <p className="block p-2 ml-2 text-1xl font-bold text-gray-900 dark:text-white">Response</p>
            <div className="p-3 rounded-b-xl bg-[#001727]">
              <SyntaxHighlighter language="json" style={nightOwl}>
                {verifyJSON()}
              </SyntaxHighlighter>
            </div>
          </div>

        </form>

        <button
          type="button"
          onClick={viewAllPrompt}
          className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          Back
        </button>
      </div>
    </div>
  );
};

export default PlayPrompt;