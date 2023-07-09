import React, { useState } from 'react';
import TableHeaderInfo from '../components/TableHeaderInfo';
import UserTable from '../components/UserTable';
import CreateReadEditUser from './CreateReadEditUser';

const ViewUsers = () => {
  const [isAllUser, setIsAllUser] = useState(true);
  const [userId, setUserId] = useState("");
  let [typeAction, setTypeAction] = useState("Add new");

  const goAllUsers = (go) => {
    setIsAllUser(go);
  }

  const deleteUser = (id) => {
    console.log(id);
  }

  /**
   * Controls the actions of the table's view, edit and delete buttons and the user id
   * 
   * @param {string} type View - Edit - Delete
   * @param {string} id e35e12e5awd5awd
   */
  const handleClick = (type, id) => {
    setUserId(id);
    setTypeAction(type);
    if (type === 'Delete') {
      deleteUser(id);
    } else {
      setIsAllUser(false);
    }
  };

  return (
    <>
      {isAllUser ?
        <>
          <TableHeaderInfo type={"user"} goAllUsers={goAllUsers} />
          <UserTable handleClick={handleClick} />
        </>
        : <CreateReadEditUser action={typeAction} userId={userId} goAllUsers={goAllUsers} />
      }
    </>
  );
};

export default ViewUsers;