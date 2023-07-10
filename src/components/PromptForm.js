import React, { useEffect, useState } from 'react';
import Alert from './Alert';

const PromptForm = ({ type, promptData, handleSave, goAllPrompts }) => {

  const [formData, setFormData] = useState(promptData);
  const [errorMessage, setErrorMessage] = useState("");

  //Control which components to show
  const isViewMode = type === 'View';

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

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Validate empty fields
    const isEmptyField = Object.values(formData).some((value) => value === "");
    if (isEmptyField) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    const isSaved = await handleSave(formData);
    if (isSaved.error) {
      setErrorMessage(isSaved.error);
    } else {
      goAllPrompts(true);
    }
  };

  const viewAllPrompt = () => {
    goAllPrompts(true);
  }
  return (
    <div className="w-full max-w-screen-xl px-4 py-4 mx-auto lg:px-12">

      <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">

        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {`${type} prompt`}
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          {errorMessage !== '' && <Alert type={"Danger"} message={errorMessage} />}
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
                required=""
                value={formData.name}
                onChange={handleChange}
                disabled={isViewMode} />
            </div>

            <div>
              <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
              <select id="type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="type"
                value={formData.type}
                onChange={handleChange}
                disabled
              >
                <option value="edit">Edit</option>
                <option value="image">Image</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Input</label>
              <textarea id="input" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="The input text to use as a starting point for the edit"
                name="input"
                value={formData.input}
                onChange={handleChange}
                disabled={isViewMode}>
              </textarea>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="instruction" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instruction</label>
              <textarea id="instruction" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="The instruction that tells the model how to edit the prompt"
                name="instruction"
                value={formData.instruction}
                onChange={handleChange}
                disabled={isViewMode}>
              </textarea>
            </div>

            <div>
              <label htmlFor="temperature" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Temperature</label>
              <input type="number"
                name="temperature"
                id="temperature"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="0.5"
                min={0}
                max={1}
                step={0.1}
                required=""
                value={formData.temperature}
                onChange={handleChange}
                disabled={isViewMode} />
            </div>

            <div>
              <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model</label>
              <select id="model"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="model"
                value={formData.model}
                onChange={handleChange}
                disabled={isViewMode}
              >
                <option value="text-davinci-edit-001">text-davinci-edit-001</option>
                <option value="code-davinci-edit-001">code-davinci-edit-001</option>
              </select>
            </div>

          </div>

          <div className="flex space-x-4">
            {!isViewMode &&
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save
              </button>
            }
            <button
              type="button"
              onClick={viewAllPrompt}
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PromptForm;