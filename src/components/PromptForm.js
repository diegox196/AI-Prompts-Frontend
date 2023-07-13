import React, { useEffect, useState } from 'react';
import Alert from './Alert';
import Chip from './Chip';

const PromptForm = ({ formType, promptData, handleSave, goAllPrompts }) => {

  const [typeSelected, setTypeSelected] = useState("completion");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState(promptData);

  const modelEdit = [
    "text-davinci-edit-001", "code-davinci-edit-001"
  ];

  const modelCompletion = [
    "text-davinci-edit-001",
    "code-davinci-edit-001",
    "gpt-3.5-turbo-16k-0613",
    "gpt-3.5-turbo-16k",
    "gpt-3.5-turbo-0301",
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-0613"
  ]

  useEffect(() => {
    if (formType === "Edit") {
      setFormData(promptData);
      setTypeSelected(promptData.type);
    }

    getBodyPrompt(promptData.type);
  }, [promptData]);

  const getBodyPrompt = (promptType) => {
    switch (promptType) {
      case "edit":
        formData.body = {
          model: "",
          input: "",
          instruction: "",
          temperature: 1
        };
        break;
      case "completion":
        formData.body = {
          model: "",
          prompt: "",
          max_tokens: 1,
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
  }

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;

      if (name === 'type') {
        setTypeSelected(value);
        getBodyPrompt(value);
      }

      if (name === "tags") {
        // For the tags field, create an array with the selected values
        const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData((prevData) => ({
          ...prevData,
          tags: selectedTags
        }));
      } else if (name.startsWith("body.")) {
        // For the nested fields under 'body', update the state accordingly
        const fieldName = name.split(".")[1];
        setFormData((prevData) => ({
          ...prevData,
          body: {
            ...prevData.body,
            [fieldName]: value
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate empty fields
    /*const isEmptyField = Object.values(formData).some((value) => value === "");
    if (isEmptyField) {
      setErrorMessage("Please fill in all fields");
      return;
    }*/

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

  const handleDeleteChip = (item) => {
    console.log("eliminar " + item)
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
                  min="0"
                  max="2"
                  step={0.1}
                  value={formData.body.temperature || 1}
                  onChange={handleChange}
                  required="" />
              </div>

              <div>
                <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model</label>
                <select id="model"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="body.model"
                  value={formData.body.model}
                  onChange={handleChange}
                >
                  {typeSelected === "edit" ? modelEdit.map((model) => (
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
                <div className='sm:col-span-2'>
                  <label htmlFor="n_image" className="flex flex-row items-center justify-between mb-4 text-sm font-medium text-gray-900 dark:text-white">Number of images
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{formData.body.n || 1}</p>
                  </label>
                  <input
                    type="range"
                    name="body.n"
                    id="n_image"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    min={1}
                    max={10}
                    step={1}
                    required=""
                    value={formData.body.n || 1}
                    onChange={handleChange} />
                </div>
              </>
            }
          </div>

          <div className="flex flex-wrap pb-4">
            <Chip text={"Primary"} handleDeleteChip={handleDeleteChip} />
            <Chip text={"Secondary"} handleDeleteChip={handleDeleteChip} />
            <Chip text={"Other"} handleDeleteChip={handleDeleteChip} />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
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