import React, { useState } from 'react';
import TableHeaderInfo from '../components/TableHeaderInfo';
import UserTable from '../components/UserTable';
import CreateEditUser from '../pages/CreateEditUser';


const ViewUsers = () => {
  const [isAllUser, setIsAllUser] = useState(true);

  const handleNewUser = () => {
    setIsAllUser(false);
  }

  return (
    <>
      {isAllUser ?
        <>
          <TableHeaderInfo type={"user"} onHandleNew = {handleNewUser}/>
          <UserTable />
        </>
        : <CreateEditUser action={"Create"}/>
      }
    </>
  );
};

export default ViewUsers;