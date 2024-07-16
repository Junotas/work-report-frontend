import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link to="/" className="text-xl font-bold">Employee List</Link>
      <Link to="/time-reports" className="text-xl font-bold">Time Reports</Link>
      <Link to="/profile" className="text-xl font-bold">Profile</Link>
    </header>
  );
};

export default Header;
