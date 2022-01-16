import React from 'react';
import './MoviesCard.css';
import { baseUrl } from "../../../utils/config";

function MoviesCard(props) {
  const isLiked = !props.isSavedMovies && props.likedMovies(props.movie);

  function handleLikeClick() {
    props.onAddMovie({
      country: props.movie.country,
      director: props.movie.director,
      duration: props.movie.duration,
      year: props.movie.year,
      description: props.movie.description,
      image: `${baseUrl}${props.movie.image ? props.movie.image.url : ""}`,
      trailer: props.movie.trailerLink,
      thumbnail: `${baseUrl}${
        props.movie.image.formats.thumbnail
          ? props.movie.image.formats.thumbnail.url
          : ""
      }`,
      movieId: props.movie.id,
      nameRU: props.movie.nameRU,
      nameEN: props.movie.nameEN,
      isSaved: props.movie.isSaved,
    });
  }

  function handleDeleteClick() {
    props.onDelete(props.movie);
  }

  return (
    <li className="movie">
      <a
        href={props.trailerLink || props.trailer}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
      <img className="movie__img" src={
            props.isSavedMovies
              ? props.movie.image
              : `${baseUrl}${
                  props.movie.image ? props.movie.image.url : props.image
                }`
          } alt={props.name} />
      </a>
      <div className="movie__txt-container">
        <p className="movie__title">{props.name || props.movie.nameRU}</p>
        <span className="movie__duration">{`${Math.floor(
            (props.duration || props.movie.duration) / 60
          )}ч ${(props.duration || props.movie.duration) % 60}м`}</span>
      </div>
        {!props.isSavedMovies && <button className="movie__button movie__button_type_save" onClick={handleLikeClick} >Cохранить</button>}
        {(props.isSavedMovies && isLiked) && <button className="movie__button movie__button_type_remove" onClick={handleDeleteClick} />}
        {props.isSavedMovies && <span className="movie__button movie__saved-icon"/>}
    </li>
  );
};

export default MoviesCard;
