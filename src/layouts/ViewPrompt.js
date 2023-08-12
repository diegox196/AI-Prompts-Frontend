import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayPrompt from './PlayPrompt';
import SkeletonPlayPrompt from '../components/SkeletonPlayPrompt';

/**
 * ViewPrompt component.
 * Fetches and displays the data of a specific prompt.
 *
 * @param {string} promptId - The ID of the prompt to view.
 * @param {function} goAllPrompts - Callback function to navigate back to all prompts view.
 */
const ViewPrompt = ({ promptId, goAllPrompts }) => {

  const [promptData, setPromptData] = useState(null);

  useEffect(() => {
    const getPromptData = async () => {
      if (promptId) {
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
      }
    };

    getPromptData();
  }, [promptId]);

  return (
    <>
      {!promptData && <SkeletonPlayPrompt />}
      {promptData && <PlayPrompt promptData={promptData} goAllPrompts={goAllPrompts} />}
    </>
  );
};

export default ViewPrompt;