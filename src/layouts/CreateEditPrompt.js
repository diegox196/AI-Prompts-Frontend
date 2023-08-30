import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PromptForm from './PromptForm';

/**
* CreateEditPrompt page.
* Allows creating or editing a prompt.
*
* @param {string} action - The action to perform (Create or Edit).
* @param {string} promptId - The ID of the prompt to edit.
* @param {function} goAllPrompts - Callback function to navigate back to all prompts view.
*/
const CreateEditPrompt = ({ action, promptId, goAllPrompts }) => {

  const userId = JSON.parse(sessionStorage.getItem("user")).user_id

  const initData = {
    "name": "",
    "type": "completion",
    "user_id": userId,
    "tags": [],
    "body": {},
    "response": ""
  };

  const [promptData, setPromptData] = useState(initData);

  useEffect(() => {
    const getPromptData = async () => {
      if (action === "Edit") {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/prompts/${promptId}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("auth")}`
            }
          });
          setPromptData(response.data);
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      } else {
        setPromptData(initData);
      }
    };

    getPromptData();
  }, []);

  /**
   * Updates a prompt with new data.
   *
   * @param {object} newData - The updated prompt data.
   * @returns {object} - The updated prompt data or an error response.
   */
  const updateNewPrompt = async (newData) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URI}/api/prompts/${newData._id}`, newData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`
        }
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  /**
   * Creates a new prompt with the provided data.
   *
   * @param {object} newData - The data of the new prompt.
   * @returns {object} - The created prompt data or an error response.
   */
  const createNewPrompt = async (newData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URI}/api/prompts`, newData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`
        }
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  /**
   * Handles the save action for the prompt data.
   *
   * @param {object} newData - The updated prompt data or new prompt data.
   * @returns {object} - The updated or created prompt data, or an error response.
   */
  const handleSave = async (newData) => {
    if (action === "Edit") {
      return await updateNewPrompt(newData);
    } else {
      return await createNewPrompt(newData);
    }
  };

  return (
    promptData && <PromptForm formType={action} promptData={promptData} handleSave={handleSave} goAllPrompts={goAllPrompts} />
  );
};

export default CreateEditPrompt;