import React, { useState } from 'react';
import LoadingButton from '../LoadingButton';
import Alert from '../Alert';

const GeneralInformationSection = ({ userData, handleChange, updateDataUser, showToastSaved, updateName }) => {

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitGeneralInformation = async (e) => {
    e.preventDefault();
    const body = {
      username: userData.username,
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone_number: userData.phone_number
    };

    setIsLoading(true);
    const isSaved = await updateDataUser(body);
    setIsLoading(false);

    if (isSaved.error) {
      setErrorMessage(isSaved.error);
    } else {
      updateName(`${isSaved.first_name} ${isSaved.last_name}`);
      showToastSaved();
    }
  };

  return (
    <section className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 mb-4 col-span-2">
      <h3 className="mb-4 text-xl font-bold text-black dark:text-white">General information</h3>
      <form onSubmit={handleSubmitGeneralInformation}>
        {errorMessage !== '' && <Alert type={"Danger"} message={errorMessage} />}
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="username"
              required
              value={userData.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="First name"
              required
              value={userData.first_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Last name"
              required
              value={userData.last_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
            <input
              type="phone"
              name="phone_number"
              id="phone_number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="88558855"
              required
              value={userData.phone_number}
              onChange={handleChange}
            />
          </div>

        </div>
        <div className="flex space-x-4">
          <LoadingButton isLoading={isLoading} btnText={"Save"} loadingText={"Saving..."} />
        </div>
      </form>
    </section>
  );
};

export default GeneralInformationSection;