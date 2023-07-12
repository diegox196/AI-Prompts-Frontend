import React, { useState } from 'react';
import axios from 'axios';

import TableHeaderInfo from '../components/TableHeaderInfo';
import PromptTable from '../components/PromptTable';
import CreateEditPrompt from './CreateEditPrompt';
import ViewPrompt from './ViewPrompt';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const Prompts = ({ isAllPrompt, setIsAllPrompt }) => {
  const [promptId, setPromptId] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);

  let [typeAction, setTypeAction] = useState("Add new");

  const goAllPrompts = (go) => {
    setIsAllPrompt(go);
  }

  const deletePrompt = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URI}/api/prompt/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Controls the actions of the table's view, edit and delete buttons and the prompt id
   * 
   * @param {string} type View - Edit - Delete
   * @param {string} id e35e12e5awd5awd
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

  const handleConfirm = () => {
    deletePrompt(promptId);
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