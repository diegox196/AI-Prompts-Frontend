import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Users from './Users';
import Prompts from './Prompts';

/**
 * Dashboard page.
 * Renders the sidebar, navbar, and the main content (Users or Prompts).
 *
 * @param {function} handleLogout - Function to handle user logout.
 * @param {string} typeView - Type of view to display (user or prompt).
 */
const Dashboard = ({ handleLogout, typeView }) => {

  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State to control the open/closed state of the navbar
  const [isMainScreen, setIsMainScreen] = useState(true); //Allows to display the tables or the action screen (create or edit)

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleSideBar = () => {
    setIsMainScreen(true);
  }

  return (
    <>
      <Sidebar isNavbarOpen={isNavbarOpen} handleLogout={handleLogout} onHandleClick={handleSideBar} />
      <Navbar handleNavbarToggle={handleNavbarToggle} />
      <div className="sm:ml-64 mt-14 pt-4">
        {
          typeView === "user"
            ? <Users isAllUser={isMainScreen} setIsAllUser={setIsMainScreen} />
            : <Prompts isAllPrompt={isMainScreen} setIsAllPrompt={setIsMainScreen} />
        }
      </div>
    </>
  );
};

export default Dashboard;