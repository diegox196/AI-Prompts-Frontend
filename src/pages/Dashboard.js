import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Users from './Users';
import Prompts from './Prompts';

const Dashboard = ({ handleLogout, typeView }) => {

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isMainScreen, setIsMainScreen] = useState(true);

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