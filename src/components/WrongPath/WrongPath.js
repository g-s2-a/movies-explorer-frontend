import React from 'react';
import { Link } from 'react-router-dom';
import './WrongPath.css';

const WrongPath = () => (
  <>
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
      <Link to="/" className="not-found__back-link">Назад</Link>
    </section>
  </>
);

export default WrongPath;
