import React, { useState } from 'react';
import Alert from '../Alert';
import LoadingButton from '../LoadingButton';

const PreferenceSection = ({ userData, handleChange, showToastSaved, updateDataUser }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const initTheme = ('theme' in localStorage) ? localStorage.getItem('theme') : 'system';
  const [theme, setTheme] = useState(initTheme);


  const changeTheme = () => {
    const element = document.documentElement;
    switch (theme) {
      case 'dark':
        element.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        break;
      case 'light':
        element.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        break;
      default:
        localStorage.removeItem('theme');
        break;
    };
  };

  const handleSubmitPreferences = async (e) => {
    e.preventDefault();
    const body = {
      two_factor_enabled: userData.two_factor_enabled
    };

    setIsLoading(true);
    const isSaved = await updateDataUser(body);
    setIsLoading(false);

    if (isSaved.error) {
      setErrorMessage(isSaved.error);
    } else {
      showToastSaved();
    }
    changeTheme();
  };

  return (
    <section className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 mb-4">
      <h3 className="mb-4 text-xl font-bold text-black dark:text-white">Preferences</h3>
      <form onSubmit={handleSubmitPreferences}>
        {errorMessage !== '' && <Alert type={"Danger"} message={errorMessage} />}
        <div className="flex items-center justify-between py-4">
          <div className="flex flex-col grow px-2">
            <p className="text-lg font-semibold text-black dark:text-white">Two-factor authtentication</p>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Add an extra layer of security to your account by request access to your phone when your log in
            </p>
          </div>
          <label htmlFor="two_factor_enabled" className="relative inline-flex items-center mb-4 cursor-pointer">
            <input type="checkbox"
              id="two_factor_enabled"
              name="two_factor_enabled"
              checked={userData.two_factor_enabled}
              onChange={handleChange}
              className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-4 border-t-2 border-gray-300 dark:border-gray-500">
          <div className="flex flex-col grow px-2">
            <p className="text-lg font-semibold text-black dark:text-white">Theme</p>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              When this option is activated, the interface is transformed into dark, light tones or uses the theme of your system.
            </p>
          </div>
          <select id="theme"
            className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="system">Same as system</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        <div className="flex space-x-4 mt-4">
          <LoadingButton isLoading={isLoading} btnText={"Save All"} loadingText={"Saving..."} />
        </div>
      </form>
    </section>
  );
};

export default PreferenceSection;