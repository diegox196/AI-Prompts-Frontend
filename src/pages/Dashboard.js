import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Users from '../layouts/Users';
import Prompts from '../layouts/Prompts';

/**
 * Dashboard page.
 * Renders the sidebar, navbar, and the main content (Users or Prompts).
 *
 * @param {function} handleLogout - Function to handle user logout.
 * @param {string} typeView - Type of view to display (user or prompt).
 * @param {string} name - The user name.
 */
const Dashboard = ({ handleLogout }) => {

  const userJSON = sessionStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : { role: "user" };
  const role = user.role;
  const isAdmin = role === "admin";
  const typeView = isAdmin ? "user" : "prompt"

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
      <Navbar handleNavbarToggle={handleNavbarToggle} name={user.name} />
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