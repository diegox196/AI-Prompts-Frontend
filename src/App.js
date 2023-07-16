import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/Error';

import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from './pages/Dashboard';

function App() {

  const [isLogged, setIsLogged] = useState(sessionStorage.getItem("auth") || false);

  /**
   * Function to handle the login process
   * 
   * @param {string} token - The authentication token
   */
  const handleLogin = (token) => {
    setIsLogged(true);
    sessionStorage.setItem('auth', token);
  };

  /**
   * Function to handle the logout process
   */
  const handleLogout = () => {
    setIsLogged(false);
    sessionStorage.removeItem('auth');
  };

  const isAdmin = true;

  const router = createBrowserRouter([

    isLogged ?
      {
        path: "/",
        element: <Dashboard handleLogout={handleLogout} typeView={"prompt"} />,
        errorElement: <Error />
      }
      : {
        path: "/",
        element: <Login handleLogin={handleLogin} />,
        errorElement: <Error />,
      },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/prompt",
      element: <Dashboard handleLogout={handleLogout} typeView={"prompt"} />
    },
    isAdmin && {
      path: "/user",
      element: <Dashboard handleLogout={handleLogout} typeView={"user"} />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
