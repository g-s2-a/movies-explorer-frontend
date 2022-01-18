import React from 'react';
import './Footer.css';
import { facebook, github, praktikum } from '../../utils/links';

const Footer = () => (
  <footer className="footer">
    <p className="footer__txt">Учебный проект Яндекс.Практикум</p>
    <div className="footer__block">
      <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
      <ul className="footer__list">
        <li className="footer__list-item">
          <a target="_blank" rel="noopener noreferrer" href={praktikum} className="footer__link">Яндекс.Практикум</a>
        </li>
        <li className="footer__list-item">
          <a target="_blank" rel="noopener noreferrer" href={github} className="footer__link">Github</a>
        </li>
        <li className="footer__list-item">
          <a target="_blank" rel="noopener noreferrer" href={facebook} className="footer__link">Facebook</a>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
