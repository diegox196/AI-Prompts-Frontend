import React from 'react';
import TableHeaderInfo from '../components/TableHeaderInfo';
import PromptTable from '../components/PromptTable';

const ViewPrompts = () => {
  return (
    <div>
      <TableHeaderInfo type={"prompt"} />
      <PromptTable/>
    </div>
  );
};

export default ViewPrompts;