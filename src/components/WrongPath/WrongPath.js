import React from 'react';
import { Link } from 'react-router-dom';
import './WrongPath.css';

const WrongPath = () => (
  <>
    <section className="wrong-path">
      <h1 className="wrong-path__title">404</h1>
      <p className="wrong-path__subtitle">Страница не найдена1</p>
      <Link to="/" className="wrong-path__back-link">Назад</Link>
    </section>

  </>
);

export default WrongPath;
