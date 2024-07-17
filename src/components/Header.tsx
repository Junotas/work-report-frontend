import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaClipboardList, FaHome } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link to="/" className="flex items-center text-xl font-bold">
        <FaHome className="mr-2" /> Employee List
      </Link>
      <Link to="/time-reports" className="flex items-center text-xl font-bold">
        <FaClipboardList className="mr-2" /> Time Reports
      </Link>
      <Link to="/profile" className="flex items-center text-xl font-bold">
        <FaUser className="mr-2" /> Profile
      </Link>
    </header>
  );
};

export default Header;
