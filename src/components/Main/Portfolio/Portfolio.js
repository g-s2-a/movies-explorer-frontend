import React from 'react';
import './Portfolio.css';
import { staticSite, adaptiveSite, spa } from '../../../utils/links';

const Portfolio = () => (
  <div className="portfolio">
    <h3 className="portfolio__title">Портфолио</h3>
    <ul className="portfolio__list">
      <li className="portfolio__list-item">
        <a target="_blank" rel="noopener noreferrer" className="portfolio__link" href={staticSite}>Статичный сайт</a>
      </li>
      <li className="portfolio__list-item">
        <a target="_blank" rel="noopener noreferrer" className="portfolio__link" href={adaptiveSite}>Адаптивный сайт</a>
      </li>
      <li className="portfolio__list-item">
        <a target="_blank" rel="noopener noreferrer" className="portfolio__link" href={spa}>Одностраничное приложение</a>
      </li>
    </ul>
  </div>
);

export default Portfolio;
