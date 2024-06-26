import React, { useEffect, useState } from 'react';
import Alert from '../components/Alert';
import TagsInput from '../components/TagsInput';
import LoadingButton from '../components/LoadingButton';

/**
 * PromptForm component displays a form for creating or editing a prompt.
 * It allows users to enter prompt details such as name, type, and body.
 *
 * @param {string} formType - The type of form ('Create' or 'Edit')
 * @param {Object} promptData - The initial data for the prompt
 * @param {function} handleSave - Function to handle saving the prompt
 * @param {function} goAllPrompts - Function to navigate back to all prompts view
 */
const PromptForm = ({ formType, promptData, handleSave, goAllPrompts }) => {

  const [typeSelected, setTypeSelected] = useState("completion");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState(promptData);

  const modelEdit = [
    "text-davinci-edit-001", "code-davinci-edit-001"
  ];

  const modelCompletion = [
    "babbage",
    "text-davinci-003",
    "text-davinci-001",
    "text-curie-001",
    "text-ada-001"
  ];

  const immageSize = [
    "256x256", "512x512", "1024x1024"
  ]

  useEffect(() => {
    if (formType === "Edit") {
      setFormData(promptData);
      setTypeSelected(promptData.type);
    }

    getBodyPrompt(promptData.type);
  }, [promptData]);

  /**
  * Sets the body of the form based on the selected prompt type
  *
  * @param {string} promptType - The selected prompt type
  */
  const getBodyPrompt = (promptType) => {
    switch (promptType) {
      case "edit":
        formData.body = {
          model: "text-davinci-edit-001",
          input: "",
          instruction: "",
          temperature: 1
        };
        break;
      case "completion":
        formData.body = {
          model: "text-davinci-003",
          prompt: "",
          max_tokens: 256,
          temperature: 1
        };
        break;
      case "image":
        formData.body = {
          prompt: "",
          n: 1,
          size: "256x256"
        };
        break;
    }
  };

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;

      if (name === 'type') {
        setTypeSelected(value);
        getBodyPrompt(value);
      }

      if (name.startsWith("body.")) {
        // For the nested fields under 'body', update the state accordingly
        const fieldName = name.split(".")[1];
        let newValue = (fieldName === 'temperature' || fieldName === 'n') ? parseFloat(value) : value;
        setFormData((prevData) => ({
          ...prevData,
          body: {
            ...prevData.body,
            [fieldName]: newValue
          }
        }));
      } else {
        // For other fields, update the state directly
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Updates the tags in the form data
   *
   * @param {array} data - The updated tags array
   */
  const updateTags = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: data
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const isSaved = await handleSave(formData);
    setIsLoading(false);
    if (isSaved.error) {
      setErrorMessage(isSaved.error);
    } else {
      goAllPrompts(true);
    }
  };

  /**
   * Navigates back to the all prompts view
   */
  const viewAllPrompt = () => {
    goAllPrompts(true);
  }

  /**
   * Handles the keydown event on the form
   *
   * @param {object} event - The keydown event object
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  return (
    <div className="w-full max-w-screen-xl px-4 py-4 mx-auto lg:px-12">

      <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">

        <div className="pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {`${formType} prompt`}
          </h3>
          {formType === 'Edit' &&
            <p className='text-black dark:text-gray-300'>You can only change the attributes of the edit prompt but not change the type of prompt.</p>}
        </div>

        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          {errorMessage !== '' && <Alert type={"Danger"} message={errorMessage} />}
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="text"
                name="name"
                id="name"
                autoComplete="off"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
              <select id="type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="type"
                value={formData.type}
                onChange={handleChange}
                disabled={formType === "Edit"}
              >
                <option value="completion">Completion</option>
                <option value="image">Image</option>
                <option value="edit">Edit</option>
              </select>
            </div>

            {typeSelected === "edit" && <>
              <div className="sm:col-span-2">
                <label htmlFor="input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Input</label>
                <textarea id="input" rows="4" className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="The input text to use as a starting point for the edit"
                  name="body.input"
                  required
                  value={formData.body.input}
                  onChange={handleChange}>
                </textarea>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="instruction" className="resize-none block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instruction</label>
                <textarea id="instruction" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="The instruction that tells the model how to edit the prompt"
                  name="body.instruction"
                  value={formData.body.instruction}
                  onChange={handleChange}>
                </textarea>
              </div>
            </>
            }
            {typeSelected === "completion" && <>
              <div className="sm:col-span-2">
                <label htmlFor="prompt"
                  className="resize-none block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prompt</label>
                <textarea id="prompt"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="The instruction that tells the model how to edit the prompt"
                  name="body.prompt"
                  value={formData.body.prompt}
                  onChange={handleChange}>
                </textarea>
              </div>
            </>}

            {(typeSelected === "edit" || typeSelected === "completion") && <>
              <div>
                <label htmlFor="temperature"
                  className="flex flex-row items-center justify-between mb-4 text-sm font-medium text-gray-900 dark:text-white">Temperature
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{formData.body.temperature || 1}</p>
                </label>

                <input id="temperature"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  type="range"
                  name="body.temperature"
                  min={0.1}
                  max={2}
                  step={0.1}
                  value={formData.body.temperature || 1}
                  onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model</label>
                <select id="model"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="body.model"
                  value={formData.body.model}
                  onChange={handleChange}
                  defaultValue={modelCompletion[1]}
                >
                  {typeSelected === "edit"
                    ? modelEdit.map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))
                    : modelCompletion.map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                </select>
              </div>
            </>
            }
            {typeSelected === "image" &&
              <>
                <div className="sm:col-span-2">
                  <label htmlFor="prompt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prompt</label>
                  <textarea id="prompt" rows="4" className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="The prompt text to use as a starting point for the edit"
                    name="body.prompt"
                    value={formData.body.prompt}
                    onChange={handleChange}>
                  </textarea>
                </div>
                <div>
                  <label htmlFor="n_image" className="flex flex-row items-center justify-between mb-4 text-sm font-medium text-gray-900 dark:text-white">Number of images
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{formData.body.n || 1}</p>
                  </label>
                  <input
                    type="range"
                    name="body.n"
                    id="n_image"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    min={1}
                    max={5}
                    step={1}
                    required=""
                    value={formData.body.n || 1}
                    onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
                  <select id="size"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="body.size"
                    value={formData.body.size}
                    onChange={handleChange}
                  >
                    {immageSize.map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))
                    }
                  </select>
                </div>
              </>
            }
          </div>

          <div className="flex flex-wrap pb-4">
            <h1 className="text-black dark:text-white font-semibold">Enter some tags related to your prompt</h1>
            <TagsInput initValue={formData.tags} updateTags={updateTags} />
          </div>


          <div className="flex space-x-4">
            <LoadingButton isLoading={isLoading} btnText={"Save"} loadingText={"Saving..."} />
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