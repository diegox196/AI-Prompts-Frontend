import React, { useState } from 'react';
import axios from 'axios';

import TableHeaderInfo from '../components/TableHeaderInfo';
import UserTable from '../components/UserTable';
import CreateReadEditUser from './CreateReadEditUser';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

/**
 * Users page.
 * Renders the users table, user creation/editing form, and delete confirmation modal.
 *
 * @param {boolean} isAllUser - Determine if all users should be displayed.
 * @param {function} setIsAllUser - Function to update the isAllUser state.
 */
const Users = ({ isAllUser, setIsAllUser }) => {
  const [userId, setUserId] = useState("");
  const [isShowModal, setIsShowModal] = useState(false); // State to control the visibility of the delete confirmation modal
  let [typeAction, setTypeAction] = useState("Add new"); // State to store the type of action (Add new, View, Edit, Delete)

  const goAllUsers = (go) => {
    setIsAllUser(go);
  }

  /**
   * Controls the actions of the table's view, edit, and delete buttons and sets the user ID.
   * If the action is "Delete", the delete confirmation modal is displayed.
   * Otherwise, the isAllPrompt state is set to false.
   *
   * @param {string} type - The action type (e.g., "View", "Edit", "Delete").
   * @param {string} id - The ID of the user.
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

  /**
 * Deletes a user from the database.
 *
 * @param {string} id The ID of the user to delete.
 */
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URI}/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleConfirm = async () => {
    await deleteUser(userId);
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
              <TableHeaderInfo type={"user"} setTypeAction={setTypeAction} goAllData={goAllUsers} />
              <UserTable handleClick={handleClick} />
            </>
            : <CreateReadEditUser action={typeAction} userId={userId} goAllUsers={goAllUsers} />
      }
    </>
  );
};

export default Users;