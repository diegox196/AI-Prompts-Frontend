import React, { useState } from 'react';
import Alert from './Alert';
import LoadingButton from './LoadingButton';
import axios from 'axios';

import Carousel from './Carousel';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';

/**
 * PlayPrompt component.
 * Displays the prompt data and allows running the prompt.
 *
 * @param {object} promptData - The data of the prompt to display.
 * @param {function} goAllPrompts - Callback function to navigate back to all prompts view.
 */
const PlayPrompt = ({ promptData, goAllPrompts }) => {

  const [formData, setFormData] = useState(promptData);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShowJSON, setIsShowJSON] = useState(false);

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

  const imageArray = [
    { url: "https://flowbite.com/docs/images/carousel/carousel-1.svg" },
    { url: "https://flowbite.com/docs/images/carousel/carousel-2.svg" },
    { url: "https://flowbite.com/docs/images/carousel/carousel-3.svg" },
    { url: "https://flowbite.com/docs/images/carousel/carousel-4.svg" },
    { url: "https://flowbite.com/docs/images/carousel/carousel-5.svg" },
  ];

  /**
   * Update the response of the prompt in the backend.
   */
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

  /**
   * Send the request to OpenAI API based on the prompt type.
   *
   * @returns {Promise} The response from the OpenAI API.
   */
  const requestOpenAi = async () => {

    let uri;
    console.log(promptData.type);
    switch (promptData.type) {
      case "edit":
        uri = process.env.REACT_APP_OPENAI_EDIT;
        break;
      case "image":
        uri = process.env.REACT_APP_OPENAI_IMAGE;
        break;
      case "completion":
        uri = uri = process.env.REACT_APP_OPENAI_COMPLETION;
        break;
      default:
        uri = "";
        break;
    }
    console.log(uri);
    try {
      return await axios.post(uri, formData.body, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        }
      });
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading button
    console.log(promptData.body);
    const response = await requestOpenAi();
    console.log(response);
    //await updateResponsePrompt();
    setIsLoading(false); // Hide loading button
  };

  /**
   * Navigate back to all prompts view.
   */
  const viewAllPrompt = () => {
    goAllPrompts(true);
  }

  /**
   * Verify if the response is a valid JSON and format it for display.
   *
   * @returns {string} The formatted JSON response.
   */
  const verifyJSON = () => {
    try {
      // Convert to JSON object
      const jsonObject = JSON.parse(formData.response);
      // Convert back to JSON string with formatted indentation
      const formattedJsonString = JSON.stringify(jsonObject, null, 2);
      return formattedJsonString;
    } catch (err) {
      return formData.response;
    }
  }

  /**
   * Get the text response from the JSON for display.
   *
   * @returns {string} The text response.
   */
  const showTextResponse = () => {
    const json = JSON.parse(formData.response);
    if (json.choices && json.choices.length > 0) {
      return json.choices[0].text;
    } else {
      return "No choices found in the JSON response.";
    }
  }

  /**
   * Get the images for display.
   *
   * @returns {Array} The array of image objects.
   */
  const getImages = () => {
    try {
      const images = JSON.parse(formData.response);
      if (images.data && images.data.length > 0) {
        return images.data;
      }
    } catch (error) {
      return imageArray;
    }

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
          <small className="uppercase mr-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ml-2">
            {promptData.type}
          </small>
        </h2>

        {(promptData.type === 'edit') ? <>
          <div className="pb-4">
            <h2 className="block mb-2 text-1xl font-bold text-gray-900 dark:text-white">Input</h2>
            <p className="mb-3 text-gray-500 dark:text-gray-400">{formData.body.input}</p>
          </div>

          <div className="pb-4">
            <h2 className="block mb-2 text-1xl font-bold text-gray-900 dark:text-white">Instruction</h2>
            <p className="mb-3 text-gray-500 dark:text-gray-400">{formData.body.instruction}</p>
          </div>
        </>
          :
          <div className="pb-4">
            <h2 className="block mb-2 text-1xl font-bold text-gray-900 dark:text-white">Prompt</h2>
            <p className="mb-3 text-gray-500 dark:text-gray-400">{formData.body.prompt}</p>
          </div>
        }

        <form onSubmit={handleSubmit}>

          <div className="flex space-x-4 pb-6">
            <LoadingButton isLoading={isLoading} btnText={"Run"} typeIcon={"Run"} />
            <button
              type="button"
              onClick={viewAllPrompt}
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Back
            </button>
          </div>

          {errorMessage !== '' && <Alert type={"Danger"} message={errorMessage} />}


          {promptData.type !== 'image' ?
            <><div className="mb-3 bg-gray-300 dark:bg-gray-700 rounded-xl">
              <div className="flex justify-start p-3">
                <p className={`${!isShowJSON && "bg-gray-100 dark:bg-gray-500"} p-2 text-1xl font-bold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 rounded-lg cursor-pointer`}
                  onClick={() => setIsShowJSON(false)}>
                  Response</p>
                <p className={`${isShowJSON && "bg-gray-100 dark:bg-gray-500"} p-2 ml-1 text-1xl font-bold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 rounded-lg cursor-pointer`}
                  onClick={() => setIsShowJSON(true)}>
                  JSON</p>
              </div>
              <div className="p-3 rounded-b-xl bg-[#001727]">
                <SyntaxHighlighter language="json" style={nightOwl}>
                  {isShowJSON ? verifyJSON() : showTextResponse()}
                </SyntaxHighlighter>
              </div>
            </div>
            </>
            :
            <Carousel items={getImages()} />
          }

        </form>
      </div>
    </div>
  );
};

export default PlayPrompt;