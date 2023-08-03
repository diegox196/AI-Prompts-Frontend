import React, { useEffect, useState } from 'react';
import Alert from './Alert';

/**
 * UserForm component.
 * Renders a form for creating, editing, or viewing user data.
 *
 * @param {string} type - The type of user form (e.g., "View", "Add new", "Edit").
 * @param {object} userData - The user data to populate the form fields.
 * @param {function} handleSave - The function to handle saving the user data.
 * @param {function} goAllUsers - The function to navigate back to the list of all users.
 */
const UserForm = ({ type, userData, handleSave, goAllUsers }) => {

  const [formData, setFormData] = useState(userData);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //Control which components to show
  const isViewMode = type === 'View';
  const isCreateMode = type === 'Add new';

  // Update the formData state when user data changes
  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate empty fields
    const isEmptyField = Object.values(formData).some((value) => value === "");
    if (isEmptyField) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (isCreateMode) {
      // Validate passwords in create mode
      if (formData.password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }
    }

    const isSaved = await handleSave(formData);
    if (isSaved.error) {
      setErrorMessage(isSaved.error);
    } else {
      goAllUsers(true);
    }
  };

  const viewAllUser = () => {
    goAllUsers(true);
  }

  return (
    <section className="w-full max-w-screen-xl px-4 py-4 mx-auto lg:px-12">
      <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {`${type} user`}
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          {errorMessage !== '' && <Alert type={"Danger"} message={errorMessage} />}
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Username"
                required
                value={formData.username}
                onChange={handleChange}
                disabled={isViewMode}
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isViewMode}
              />
            </div>

            {isCreateMode &&
              <>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isViewMode}
                  />
                </div>

                <div>
                  <label htmlFor="re-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input
                    type="password"
                    name="re-password"
                    id="re-password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Confirm password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
              </>
            }

            <div>
              <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="First name"
                required
                value={formData.first_name}
                onChange={handleChange}
                disabled={isViewMode}
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
                value={formData.last_name}
                onChange={handleChange}
                disabled={isViewMode}
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
                value={formData.phone_number}
                onChange={handleChange}
                disabled={isViewMode}
              />
            </div>

            <div>
              <label htmlFor="two_factor_enabled" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Two Factor Authtentication</label>
              <select
                id="two_factor_enabled"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="two_factor_enabled"
                value={formData.two_factor_enabled}
                onChange={handleChange}
                disabled={isViewMode}
              >
                <option value={false}>Disabled</option>
                <option value={true}>Enabled</option>
              </select>
            </div>

            <div>
              <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
              <select
                id="role"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={isViewMode}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
              <select
                id="state"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formData.active}
                name="active"
                onChange={handleChange}
                disabled={isViewMode}
              >
                <option value={false}>Pending</option>
                <option value={true}>Active</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            {!isViewMode &&
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save
              </button>
            }
            <button
              type="button"
              onClick={viewAllUser}
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserForm;