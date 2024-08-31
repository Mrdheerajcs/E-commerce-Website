import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from '../components/ForgotPassword';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8082/api/v1/auth/sign-in', { email, password });

      if (response.status === 200) {
        // Save token to localStorage or state management
        localStorage.setItem('token', response.data.token);
        navigate('/dashbord'); // Redirect to dashboard
      }
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login failed', error);
    }
  };

  const handleRedirectToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="flex min-h-screen bg-white mt-0 mb-0 rounded-lg shadow-lg my-2.5">
      <div className="w-1/2 -mt-2.5 bg-gray-200">
        <img src="./images/login.jpg" alt="Login" className="object-cover rounded-lg h-full w-full" />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center ">
        <div className="w-3/4 ">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl mb-4 top-0 text-center font-bold">Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-700">Email address</label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <FaEnvelope />
                </span>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer" onClick={handleTogglePassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center">
              <FaUser className="mr-2" /> Login
            </button>
          </form>
          <div className="ml-0 mt-9">
            <p className='mb-3'>Go to forget password</p>
            <ForgotPassword />
          </div>
        </div>
        <div className="mt-3">
          <div className="mt-4">
            <p className="text-sm text-center">
              Don't have an account? <span className="text-indigo-600 cursor-pointer hover:text-indigo-800" onClick={handleRedirectToRegister}>Register here</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;