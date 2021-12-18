import React from 'react';
import Logo from '../Logo/Logo';
import './Header.css';

const Header = ({ children, mod = '' }) => (
  <header className={`header ${mod}`}>
    <Logo />
    {children}
  </header>
);

export default Header;
