import React from 'react';
import PromptForm from '../components/PromptForm';

const CreateReadEditPrompt = ({action}) => {
  return (
    <>
      <PromptForm action={action}/>
    </>
  );
};

export default CreateReadEditPrompt;