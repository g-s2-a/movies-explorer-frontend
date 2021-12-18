import React from 'react';
import './NavTab.css';

const NavTab = ({ className }) => (
  <div className={className}>
  <a href="#about-project" className="nav-tab">
    О проекте
  </a>
  <a href="#technologies" className="nav-tab">
    Технологии
  </a> 
  <a href="#student" className="nav-tab">
    Студент
  </a>
  </div>
);

export default NavTab;
