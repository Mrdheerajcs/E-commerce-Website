import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt, FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate(); // Use the useNavigate hook

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8082/api/v1/auth/signup', {
                fullname,
                email,
                password,
                confirmPassword,  // Include confirmPassword in the payload
                phoneNumber
            });
            console.log('Registration successful', response.data);
            alert("Registration successful");
            navigate('/login'); // Redirect to the login page after successful registration
        } catch (error) {
            console.error('Registration failed', error.response || error);
            alert("Registration failed. Check console for details.");
        }
    };

    const handleRedirectToLogin = () => {
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div className="flex min-h-screen bg-white mt-0 mb-0 rounded-lg shadow-lg my-2.5">
            <div className="w-1/2 bg-gray-100 -mt-2.5">
                <img src="./images/register.png" alt="Register" className="object-cover rounded-lg h-full w-full" />
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <form onSubmit={handleRegister} className="w-3/4">
                    <h2 className="text-3xl mb-4 text-center font-bold">Register</h2>
                    <div className="mb-4">
                        <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <FaUser />
                            </span>
                            <input
                                type="text"
                                id="fullname"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your Full Name"
                                required
                                autoComplete="name"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <div className="relative mt-1">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <FaPhoneAlt />
                            </span>
                            <input
                                type="text"
                                maxLength={10}
                                minLength={10}
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your Phone Number"
                                required
                                autoComplete="tel"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <div className="relative mt-1">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <FaEnvelope />
                            </span>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your email"
                                required
                                autoComplete="email"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative mt-1">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <FaLock />
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your password"
                                required
                                autoComplete="new-password"
                            />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer" onClick={handleTogglePassword}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className="relative mt-1">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <FaLock />
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Confirm your password"
                                required
                                autoComplete="new-password"
                            />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer" onClick={handleTogglePassword}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="bg-green-500 text-white p-2 rounded flex items-center justify-center">
                        <FaUserPlus className="mr-2" /> Register
                    </button>
                    <p className="mt-3 text-sm text-center">
                        Already have an account? <span className="text-indigo-600 cursor-pointer" onClick={handleRedirectToLogin}>Login here</span>.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
