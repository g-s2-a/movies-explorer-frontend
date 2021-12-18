import React from 'react';
import './SearchForm.css';

const SearchForm = () => (
  <form className="search-form">
    <div className="search-form__block">
      <div className="search-form__search-container">
        <div className="search-form__input-container">
          <input className="search-form__input" placeholder="Фильм" required />
          <button className="search-form__button">Найти</button>
        </div>
        <div className="search-form__checkbox-container">
          <input className="search-form__checkbox" type="checkbox" id="switch" defaultChecked />
          <label className="search-form__checkbox-label" htmlFor="switch">
            <span className="search-form__checkbox-switch" />
          </label>
          <p className="search-form__checkbox-text">Короткометражки</p>
        </div>
      </div>
    </div>
  </form>
);

export default SearchForm;
