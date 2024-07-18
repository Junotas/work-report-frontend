import React from 'react';
import { Link } from 'react-router-dom';
import { FaClipboardList } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";


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
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center text-xl font-bold hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105">
          <FaClipboardList className="mr-2" /> Employee List
        </Link>
        <button
          onClick={toggleRole}
          style={{
            backgroundColor: 'transparent',
            color: 'transparent',
            border: 'none',
            cursor: 'default'
          }}
          className="ml-4"
        >
          Switch to {userRole === 'admin' ? 'User' : 'Admin'} View
        </button>
      </div>
      <Link to="/time-reports" className="flex items-center text-xl font-bold hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105">
        <FaUserClock className="mr-2" /> Time Reports
      </Link>
    </header>
  );
};

export default Header;
