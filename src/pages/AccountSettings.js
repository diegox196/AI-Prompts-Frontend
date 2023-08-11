import React, { useState } from 'react';
import AccountForms from '../layouts/AccountForms';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const AccountSettings = ({ handleLogout }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State to control the open/closed state of the navbar
  const [isMainScreen, setIsMainScreen] = useState(true); //Allows to display the tables or the action screen (create or edit)

  const userJSON = sessionStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : { role: "user" };
  //const user = JSON.parse(sessionStorage.getItem("user"));
  const [name, setName] = useState(user.name);

  const updateName = (newName) => {
    user.name = newName;
    setName(newName);
  }

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleSideBar = () => {
    setIsMainScreen(true);
  };

  return (
    <>
      <Sidebar isNavbarOpen={isNavbarOpen} handleLogout={handleLogout} onHandleClick={handleSideBar} />
      <Navbar handleNavbarToggle={handleNavbarToggle} name={name} />
      <div className="sm:ml-64 mt-14 pt-4">
        <AccountForms name={name} updateName={updateName} />
      </div>
    </>
  );
};

export default AccountSettings;