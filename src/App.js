import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Error from './pages/Error';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import { useState } from 'react';


function App() {

  const [isLogged, setIsLogged] = useState(sessionStorage.getItem("auth") || false);

  const handleLogin = (token) => {
    setIsLogged(true);
    console.log(isLogged);
    sessionStorage.setItem('auth', token);
  };

  const handleLogout = () => {
    setIsLogged(false);
    sessionStorage.removeItem('auth');
  };

  const router = createBrowserRouter([

    isLogged ?
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
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
      path: "/dashboard",
      element: <Dashboard />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
