import React, { useEffect } from 'react';

/**
 * LoadingButton component displays a button with optional loading spinner and text.
 *
 * @param {boolean} isLoading - Indicates whether the button is in a loading state.
 * @param {string} btnText - The text to display on the button.
 * @param {string} loadingText - The text to display when the button is in a loading state.
 * @param {string} typeIcon - The type of icon to display next to the button text. Currently supports 'Run'.
 * @param {boolean} fullWidth - Indicates whether the button should occupy the full width of its container.
 * @param {string} buttonStyle - The style to apply on the button. (Optional)
 * @param {boolean} buttonDisabled - Indicates if the button is active
 */
const LoadingButton = ({ isLoading, btnText, loadingText, typeIcon, fullWidth, buttonStyle, buttonDisabled }) => {

  const style = (buttonStyle !== undefined)
    ? buttonStyle
    : 'text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';

  let icon;

  switch (typeIcon) {
    case 'Run':
      icon = <svg className="w-3.5 h-3.5 mr-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
        viewBox="0 0 10 16"><path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z" />
      </svg>;
      break;
    default:
      icon = <></>
  }

  useEffect(() => {

  }, []);

  return (
    <button
      type="submit"
      className={`${fullWidth ? 'flex w-full justify-center text-center' : ''} ${style}`}
      disabled={buttonDisabled || false}
    >

      {isLoading
        ? <>
          <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
          </svg>
          {loadingText || "Loading..."}
        </>
        : <>
          {icon}
          {btnText}
        </>
      }
    </button>
  );
};

export default LoadingButton;