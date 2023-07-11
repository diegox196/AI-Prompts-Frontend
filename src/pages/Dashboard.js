import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Users from './Users';
import Prompts from './Prompts';

//<Prompt action={"Add"}/>

const Dashboard = ({ handleLogout, typeView }) => {

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      <Sidebar isNavbarOpen={isNavbarOpen} handleLogout={handleLogout} />
      <Navbar handleNavbarToggle={handleNavbarToggle} />
      <div className="sm:ml-64 mt-14 pt-4">
        {
          typeView === "user" ? <Users /> : <Prompts />
        }
      </div>
    </>
  );
};

export default Dashboard;