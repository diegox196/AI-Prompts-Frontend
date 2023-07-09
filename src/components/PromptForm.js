import React from 'react';

const UserForm = ({ action }) => {
  return (
    <div class="w-full max-w-screen-xl px-4 py-4 mx-auto lg:px-12">

      <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">

        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {`${action} prompt`}
          </h3>
        </div>

        <form>
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
                required="" />
            </div>

            <div>
              <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
              <select id="type" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="edit">Edit</option>
                <option value="image">Image</option>
              </select>
            </div>

            <div class="sm:col-span-2">
              <label for="input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Input</label>
              <textarea id="input" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="The input text to use as a starting point for the edit"></textarea>
            </div>

            <div class="sm:col-span-2">
              <label for="instruction" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instruction</label>
              <textarea id="instruction" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="The instruction that tells the model how to edit the prompt"></textarea>
            </div>

            <div>
              <label for="temperature" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Temperature</label>
              <input type="number"
                name="temperature"
                id="temperature"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="0.5"
                min={0}
                max={1}
                step={0.1}
                required="" />
            </div>

            <div>
              <label for="model" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model</label>
              <select id="model" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="text-davinci-edit-001">text-davinci-edit-001</option>
                <option value="code-davinci-edit-001">code-davinci-edit-001</option>
              </select>
            </div>

          </div>

          <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;