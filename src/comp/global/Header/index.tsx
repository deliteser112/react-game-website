import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <div>
      <Link to="/">Main</Link>
      <Link to="/about">About</Link>
      <Link to="/help">Help</Link>
    </div>
  );
};

export default Header;
