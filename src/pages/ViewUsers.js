import React, { useState } from 'react';
import TableHeaderInfo from '../components/TableHeaderInfo';
import UserTable from '../components/UserTable';
import CreateReadEditUser from './CreateReadEditUser';
import axios from 'axios';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const ViewUsers = () => {
  const [isAllUser, setIsAllUser] = useState(true);
  const [userId, setUserId] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);

  let [typeAction, setTypeAction] = useState("Add new");

  const goAllUsers = (go) => {
    setIsAllUser(go);
  }

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URI}/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`
        }
      });
    } catch (error) {
      console.log(error);
    }
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
      setIsShowModal(true);
    } else {
      setIsAllUser(false);
    }
  };

  // -- Action Confirm Modal
  const handleClose = () => {
    setIsShowModal(false);
  };

  const handleConfirm = () => {
    deleteUser(userId);
    setIsShowModal(false);
  };
  // -- End Action Confirm Modal

  return (
    <>
      {
        isShowModal
          ? <DeleteConfirmationModal handleClose={handleClose} handleConfirm={handleConfirm} />
          : isAllUser ?
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