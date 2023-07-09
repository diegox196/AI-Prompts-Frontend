import React from 'react';
import PromptForm from '../components/PromptForm';

const User = ({action}) => {
  return (
    <>
      <PromptForm action={action}/>
    </>
  );
};

export default User;