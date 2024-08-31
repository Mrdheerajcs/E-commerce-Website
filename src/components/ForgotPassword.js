import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleClosePopup = () => {
    setShowForgotPassword(false);
    setEmail('');
    setOtp('');
    setNewPassword('');
    setOtpSent(false);
    setError('');
    setSuccess('');
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8082/api/v1/auth/forgot-password', { email });

      if (response.status === 200) {
        setOtpSent(true);
        setSuccess('OTP sent to your email');
      }
    } catch (error) {
      setError('Failed to send OTP. Please check the email address and try again.');
      console.error('Error sending OTP', error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8082/api/v1/auth/reset-password', { email, otp, newPassword });

      if (response.status === 200) {
        setSuccess('Password reset successfully');
        setTimeout(() => handleClosePopup(), 2000); // Close popup after 2 seconds
      }
    } catch (error) {
      setError('Failed to reset password. Please check the OTP and try again.');
      console.error('Error resetting password', error);
    }
  };

  return (
    <div>
      <button
        onClick={handleForgotPassword}
        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Forgot Password
      </button>
      {showForgotPassword && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-1/2 flex relative">
            <div className="w-1/2 bg-blue-500">
              <img
                src="./images/forgot.png"
                alt="Forgot Password"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-1/2 p-6">
              <button
                onClick={handleClosePopup}
                className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-900"
              >
                &times;
              </button>
              {!otpSent ? (
                <form onSubmit={handleSendOtp}>
                  <h1 className="text-xl font-semibold mb-2">Please Don't Close the Window</h1>
                  <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                  {error && <p className="text-red-500 mb-4">{error}</p>}
                  {success && <p className="text-green-500 mb-4">{success}</p>}
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Send OTP
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <h1 className="text-xl font-semibold mb-2">Please Don't Close the Window</h1>
                  <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
                  {error && <p className="text-red-500 mb-4">{error}</p>}
                  {success && <p className="text-green-500 mb-4">{success}</p>}
                  <div className="mb-4">
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
                    <input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Verify OTP and Reset Password
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
