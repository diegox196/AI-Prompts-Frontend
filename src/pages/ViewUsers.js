import React from 'react';
import TableHeaderInfo from '../components/TableHeaderInfo';
import UserTable from '../components/UserTable';

const ViewUsers = () => {
  return (
    <div>
      <TableHeaderInfo type={"user"} />
      <UserTable/>
    </div>
  );
};

export default ViewUsers;