import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayPrompt from '../components/PlayPrompt';

/**
   * Controls the actions of view, create and edit
   * 
   * @param {string} type View - Edit - Add new
   * @param {string} id e35e12e5awd5awd
   */
const ViewPrompt = ({ promptId, goAllPrompts }) => {

  const [promptData, setPromptData] = useState(null);

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

  return (
    promptData && <PlayPrompt promptData={promptData} goAllPrompts={goAllPrompts} />
  );
};

export default ViewPrompt;