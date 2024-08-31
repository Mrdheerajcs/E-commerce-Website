import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaUserPlus, FaUserLock, FaShoppingCart } from 'react-icons/fa';
import { IoSettings, IoLogOutSharp, IoSearchSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { Tooltip } from 'react-tooltip';
import axios from 'axios';
import '../App.css';
import Darkmod from './Darkmod';
import Navbar from './Navbar';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [fullname, setFullname] = useState('');
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        axios.get('/api/v1/auth/fullname', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                setFullname(response.data);
            })
            .catch(error => {
                console.error('Error fetching fullname:', error);
            });
    }, []);

    const handleLogout = () => {
        axios.post('/api/v1/auth/logout', {}, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                console.log(response.data); // "Logout successful"
                localStorage.removeItem('token');
                navigate('/login');
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });
    };

    return (
        <div>
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 w-full flex justify-between p-4 bg-gray-200 shadow-lg z-20 border-b-2 border-blue-900">
                <Link to="/">
                    <div className="flex space-x-2 items-center">
                        <img src="./images/auslogos.png" alt="Auspicious Shop Logo" className="w-12 h-12 mt-1 rounded-full border-4" />
                        <div className="logo flex text-base">
                            <h3><span className="font-bold">A</span>uspicious <span className="font-bold">S</span>hop</h3>
                        </div>
                    </div>
                </Link>
                <div className="relative w-full max-w-md mt-3 mx-4">
                    <input type="text" placeholder="Search..." className="p-2 pl-10 w-[300px] sm:w-[300px] hover:w-[450px] transition-all duration-300 rounded-lg border border-gray-400" />
                    <IoSearchSharp className="absolute left-3 top-3 text-gray-500" />
                </div>
                <div className="flex space-x-4 items-center">
                    <nav className="flex space-x-4">
                        <div className="mt-4"><Darkmod /></div>
                        <div className="relative">
                            <Link to="/card" className="flex items-center justify-center w-12 h-12 bg-gray-200 text-gray-800 rounded-full transition-colors duration-300 hover:bg-blue-600" data-tooltip-id="CardTooltip">
                                <FaShoppingCart className="text-xl" />
                            </Link>
                            <Tooltip id="CardTooltip" place="top" effect="solid" className="bg-gray-800 text-white text-xs p-2 rounded">Add Card</Tooltip>
                        </div>
                        <div className="relative">
                            <Link to="/login" className="flex items-center justify-center w-12 h-12 bg-gray-200 text-gray-800 rounded-full transition-colors duration-300 hover:bg-blue-600" data-tooltip-id="loginTooltip">
                                <FaUserLock className="text-xl" />
                            </Link>
                            <Tooltip id="loginTooltip" place="top" effect="solid" className="bg-gray-800 text-white text-xs p-2 rounded">Login</Tooltip>
                        </div>
                        <div className="relative">
                            <Link to="/register" className="flex items-center justify-center w-12 h-12 bg-gray-200 text-gray-800 rounded-full transition-colors duration-300 hover:bg-blue-600" data-tooltip-id="registerTooltip">
                                <FaUserPlus className="text-xl" />
                            </Link>
                            <Tooltip id="registerTooltip" place="top" effect="solid" className="bg-gray-800 text-white text-xs p-2 rounded">Register</Tooltip>
                        </div>
                    </nav>
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={toggleDropdown} className="flex items-center space-x-2">
                            <FaUserCircle className="text-2xl" />
                            <span>Hi! {fullname}</span>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
                                <ul className="py-1 text-gray-700">
                                    <li>
                                        <Link to="/setting" className="flex px-4 py-2 hover:bg-gray-100">
                                            <IoSettings className="mr-2 mt-1 text-black" /> Settings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/profile" className="flex px-4 py-2 hover:bg-gray-100">
                                            <ImProfile className="mr-2 mt-1 text-black" /> Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="flex w-full bg-white  text-gray-600 text-left px-4 py-2 hover:bg-red-700 hover:text-black">
                                            <IoLogOutSharp className="mr-2 mt-1 text-black" /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Navbar Component (scrolls with content and has the same width as header) */}
            <div className="mt-[108px] w-full border-b-2 border-blue-900">
                <Navbar />
            </div>
        </div>
    );
};

export default Header;
