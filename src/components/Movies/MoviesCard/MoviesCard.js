import React from 'react';
import './MoviesCard.css';

const MoviesCard = ({ movie, isRemovable = false }) => {
  const {
    image, title, duration, isSaved,
  } = movie;

  return (
    <li className="movie">
      <img className="movie__img" src={image} alt={title} />
      <div className="movie__txt-container">
        <p className="movie__title">{title}</p>
        <span className="movie__duration">{duration}</span>
      </div>
        {!isSaved && <button className="movie__button movie__button_type_save">Cохранить</button>}
        {(isSaved && isRemovable) && <button className="movie__button movie__button_type_remove" />}
        {(isSaved && !isRemovable) && <span className="movie__button movie__saved-icon" />}
    </li>
  );
};

export default MoviesCard;
