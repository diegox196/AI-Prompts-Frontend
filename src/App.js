import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/Error';

import { createBrowserRouter, RouterProvider } from "react-router-dom";


import AccountSettings from './pages/AccountSettings';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import TwoFactorAuthentication from './pages/TwoFactorAuthentication';
import VerifiedAccount from './pages/VerifiedAccount';

/**
 * Main component that handles user authentication and routing.
 * @returns {JSX.Element} The main application component.
 */
function App() {
  /**
   * Function to handle the login process
   * 
   * @param {string} token - The authentication token
   */
  const handleLogin = (token) => {
    sessionStorage.setItem('auth', token);
  };

  /**
   * Function to handle the logout process
   */
  const handleLogout = () => {
    sessionStorage.removeItem('auth');
  };

  // Define the router configuration based on user authentication and role
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login handleLogin={handleLogin} />,
      errorElement: <Error />,
    },
    {
      path: "/dashboard",
      element: <Dashboard handleLogout={handleLogout} />,
      errorElement: <Error />
    },
    {
      path: "/account",
      element: <AccountSettings handleLogout={handleLogout} />,
      errorElement: <Error />
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/verify-2fa",
      element: <TwoFactorAuthentication />,
      errorElement: <Error />,
    },
    {
      path: "/verify-email",
      element: <VerifiedAccount />,
      errorElement: <Error />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
