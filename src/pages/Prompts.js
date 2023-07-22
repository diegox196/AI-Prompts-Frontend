import React, { useState } from 'react';
import axios from 'axios';

import TableHeaderInfo from '../components/TableHeaderInfo';
import PromptTable from '../components/PromptTable';
import CreateEditPrompt from './CreateEditPrompt';
import ViewPrompt from './ViewPrompt';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

/**
 * Prompts component.
 * Renders the prompt table, view prompt, and creation/editing form, and delete confirmation modal.
 *
 * @param {boolean} isAllPrompt - Determine if the prompt table should be displayed.
 * @param {function} setIsAllPrompt - Function to update the isAllPrompt state.
 */
const Prompts = ({ isAllPrompt, setIsAllPrompt }) => {
  const [promptId, setPromptId] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);

  let [typeAction, setTypeAction] = useState("Add new");

  const goAllPrompts = (go) => {
    setIsAllPrompt(go);
  }

  /**
   * Deletes a prompt from the database.
   *
   * @param {string} id The ID of the prompt to delete.
   */
  const deletePrompt = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URI}/api/prompt/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Controls the actions of the table's view, edit, and delete buttons and sets the prompt ID.
   * If the action is "Delete", the delete confirmation modal is displayed.
   * Otherwise, the isAllPrompt state is set to false.
   *
   * @param {string} type - The action type (e.g., "View", "Edit", "Delete").
   * @param {string} id - The ID of the prompt.
   */
  const handleClick = (type, id) => {
    setPromptId(id);
    setTypeAction(type);
    if (type === 'Delete') {
      setIsShowModal(true);
    } else {
      setIsAllPrompt(false);
    }
  };

  // -- Action Confirm Modal
  const handleClose = () => {
    setIsShowModal(false);
  };

  const handleConfirm = async () => {
    await deletePrompt(promptId);
    setIsShowModal(false);
  };
  // -- End Action Confirm Modal

  return (
    <>
      {
        isShowModal
          ? <DeleteConfirmationModal handleClose={handleClose} handleConfirm={handleConfirm} />
          : isAllPrompt ?
            <>
              <TableHeaderInfo type={"prompt"} setTypeAction={setTypeAction} goAllData={goAllPrompts} />
              <PromptTable handleClick={handleClick} />
            </>
            : typeAction === "View"
              ? <ViewPrompt promptId={promptId} goAllPrompts={goAllPrompts} />
              : <CreateEditPrompt action={typeAction} promptId={promptId} goAllPrompts={goAllPrompts} />
      }
    </>
  );
};

export default Prompts;