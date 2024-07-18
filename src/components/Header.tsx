import React from 'react';
import { Link } from 'react-router-dom';
import {  FaClipboardList, FaHome } from 'react-icons/fa';

interface HeaderProps {
  userRole: string;
  setUserRole: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ userRole, setUserRole }) => {
  const toggleRole = () => {
    setUserRole(prevRole => (prevRole === 'admin' ? 'user' : 'admin'));
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link to="/" className="flex items-center text-xl font-bold">
        <FaHome className="mr-2" /> Employee List
      </Link>
      <Link to="/time-reports" className="flex items-center text-xl font-bold">
        <FaClipboardList className="mr-2" /> Time Reports
      </Link>
      <button
        onClick={toggleRole}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 ml-4"
      >
        Switch to {userRole === 'admin' ? 'User' : 'Admin'} View
      </button>
    </header>
  );
};

export default Header;
