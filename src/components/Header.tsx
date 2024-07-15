import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link to="/" className="text-xl font-bold">Home</Link>
      <Link to="/profile" className="text-lg">Profile</Link>
    </header>
  );
};

export default Header;
