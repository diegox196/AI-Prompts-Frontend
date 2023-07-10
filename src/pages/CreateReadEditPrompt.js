import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PromptForm from '../components/PromptForm';

/**
   * Controls the actions of view, create and edit
   * 
   * @param {string} type View - Edit - Add new
   * @param {string} id e35e12e5awd5awd
   */
const CreateReadEditPrompt = ({ action, promptId, goAllPrompts }) => {

  const userId = JSON.parse(sessionStorage.getItem("user")).user_id

  let initData = {
    "name": "",
    "type": "edit",
    "user_id": userId,
    "tags": [],
    "model": "text-davinci-edit-001",
    "input": "",
    "instruction": "",
    "temperature": 0,
    "response": "none",
  };

  const [promptData, setPromptData] = useState(initData);

  useEffect(() => {
    const getPromptData = async () => {
      if (promptId) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/prompt/${promptId}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("auth")}`
            }
          });
          setPromptData(response.data);
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      }
    };

    getPromptData();
  }, [promptId]);

  const updateNewPrompt = async (newData) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URI}/api/prompt/${newData._id}`, newData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`
        }
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const createNewPrompt = async (newData) => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const response = await axios.post(`${process.env.REACT_APP_API_URI}/api/prompt`, newData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`
        }
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const handleSave = async (newData) => {
    if (action === "Edit") {
      return await updateNewPrompt(newData);
    } else {
      return await createNewPrompt(newData);
    }
  };
  return (
    <>
      <PromptForm type={action} promptData={promptData} handleSave={handleSave} goAllPrompts={goAllPrompts} />
    </>
  );
};

export default CreateReadEditPrompt;