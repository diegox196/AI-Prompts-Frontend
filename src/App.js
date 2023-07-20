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

  const role = JSON.parse(sessionStorage.getItem("user")).role;
  const isAdmin = role === "admin";
  const mainRoute = isAdmin ? "user" : "prompt"

  const router = createBrowserRouter([

    isLogged
      ? {
        path: "/",
        element: <Dashboard handleLogout={handleLogout} typeView={mainRoute} />,
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

    isAdmin
      ? {
        path: "/user",
        element: <Dashboard handleLogout={handleLogout} typeView={"user"} />
      }
      : {
        path: "/prompt",
        element: <Dashboard handleLogout={handleLogout} typeView={"prompt"} />
      }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
