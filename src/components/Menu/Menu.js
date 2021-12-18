import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

const Menu = ({
  children, mod = '', navListModification = '', navListItemModification = '', navLinkModification = '', navAccountModification = ''
}) => (
  <nav className={`nav ${mod}`}>
    <ul className={`nav__list ${navListModification}`}>
      {children}
      <li className={`nav__list-item ${navListItemModification}`}>
        <NavLink to="/movies" className={`nav__link ${navLinkModification}`} activeClassName="nav__link_active">Фильмы</NavLink>
      </li>
      <li className={`nav__list-item ${navListItemModification}`}>
        <NavLink to="/saved-movies" className={`nav__link ${navLinkModification}`} activeClassName="nav__link_active">Сохраненные фильмы</NavLink>
      </li>
    </ul>
    
      <NavLink to="/profile" className={`nav__account-link ${navAccountModification}`}>
        <div className={`nav__account-container ${navAccountModification}`}>
          <span className="nav__account-icon" />
          Аккаунт
        </div> 
      </NavLink>
    
  </nav>
);

export default Menu;
