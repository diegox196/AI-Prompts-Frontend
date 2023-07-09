import React, { useState } from 'react';
import TableHeaderInfo from '../components/TableHeaderInfo';
import UserTable from '../components/UserTable';
import CreateEditUser from '../pages/CreateEditUser';

const ViewUsers = () => {
  const [isAllUser, setIsAllUser] = useState(true);

  const handleNewUser = () => {
    setIsAllUser(false);
  }

  const [userId, setUserId] = useState("");
  let [typeAction, setTypeAction] = useState("Add new");


  /**
   * Controls the actions of the table's view, edit and delete buttons and the user id
   * 
   * @param {string} type View - Edit - Delete
   * @param {string} id e35e12e5awd5awd
   */

  const handleClick = (type, id) => {
    setUserId(id);
    setTypeAction(type);
    setIsAllUser(false);
  };

  return (
    <>
      {isAllUser ?
        <>
          <TableHeaderInfo type={"user"} onHandleNew={handleNewUser} />
          <UserTable handleClick={handleClick} />
        </>
        : <CreateEditUser action={typeAction} userId={userId} />
      }
    </>
  );
};

export default ViewUsers;