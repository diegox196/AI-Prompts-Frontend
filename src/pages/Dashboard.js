import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Prompt from './CreateEditPrompt';
import ViewUsers from './ViewUsers';

//<Prompt action={"Add"}/>

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div class="sm:ml-64 mt-14 pt-4">
        <ViewUsers/>
      </div>
    </>
  );
};

export default Dashboard;