import axios from 'axios';
import React, { useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import LoadingButton from '../components/LoadingButton';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router-dom';

const TwoFactorAuthentication = () => {

  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState("Danger");
  const navigate = useNavigate();

  const inputStyle = {
    width: '3rem',
    height: '3rem',
    margin: '0 5px',
    fontSize: '1.5rem',
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.3)',
  };


  const showMessage = (type, msg) => {
    setTypeMessage(type);
    setMessage(msg);
  };

  const sendCode = async () => {
    setMessage(null);
    try {
      const body = {
        "email": email
      };
      const codeData = await axios.post(`${process.env.REACT_APP_API_URI}/api/2fa/send`, body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTypeMessage("Success");
    } catch (error) {
      showMessage("Danger", error.response.data.error);
    }
  };

  const reSendCode = () => {
    sendCode();
    if(typeMessage === "Success"){
      setMessage("2FA code resent");
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromParams = urlParams.get('email');
    const tokenFromParams = urlParams.get('auth');

    if (emailFromParams && tokenFromParams) {
      setEmail(emailFromParams);
      setToken(tokenFromParams);
    };
  }, []);

  useEffect(() => {
    if (email && token) {
      sendCode();
    }
  }, [token]);

  const verifyCode = async (code) => {
    try {
      const body = {
        "email": email,
        "code": code
      };

      const authData = await axios.post(`${process.env.REACT_APP_API_URI}/api/2fa/verify`, body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      sessionStorage.setItem('auth', token);
      return authData;
    } catch (error) {
      return error.response;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await verifyCode(otp);
    setIsLoading(false);
    if (data.status !== 200) {
      showMessage("Danger", data.data.error);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <section className='flex min-h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {message && (
          <Alert type={typeMessage} message={message} />
        )}
        <div className='mb-8'>
          <h1 className="mb-1 text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
            Two-Factor Authentication
          </h1>
          <p className="font-light text-gray-500 dark:text-gray-400 text-center">Enter the six-digit code you received by text message</p>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            inputStyle={inputStyle}
          />
          <LoadingButton
            isLoading={isLoading}
            btnText={"Verify"}
            loadingText={"Verifying..."}
            buttonDisabled={otp.length !== 6}
            buttonStyle={"w-1/2 mt-8 text-white bg-blue-600 disabled:bg-gray-600 enabled:hover:bg-blue-700 enabled:focus:ring-4 enabled:focus:outline-none enabled:focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 disabled:dark:bg-gray-600 enabled:dark:hover:bg-blue-700 enabled:dark:focus:ring-blue-800"} />
          <button
            type="button"
            onClick={reSendCode}
            className="w-1/2 mt-5 text-blue-600 dark:text-gray-300 outline-none font-medium text-sm text-center">Re-send code</button>
        </form>
      </div>
    </section>
  );
};

export default TwoFactorAuthentication; 