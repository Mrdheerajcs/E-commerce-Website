import React from 'react';
import { Link } from 'react-router-dom';
import {FaGoogle, FaYoutube, FaInstagram} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="flex p-4 bg-gray-200">
      <ul className="flex space-x-4 ml-4 mt-2">
        <li>
          <Link to="https://www.google.com/" className="hover:text-blue-800 hover:underline">
            <FaGoogle className="ml-4" />
            Google</Link>
        </li>
        <li>
          <Link to="https://www.youtube.com/" className="hover:text-blue-800 hover:underline">
            <FaYoutube className="ml-6" />
            YouTube
          </Link>
        </li>
        <li>
          <Link to="https://www.instagram.com/" className=" hover:text-blue-800 hover:underline">
            <FaInstagram className="ml-6" />
            Instagram
          </Link>
        </li>
      </ul>
      <div className="container text-center mt-3">
        <p>© 2024 Auspicious Shop Pvt. Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
