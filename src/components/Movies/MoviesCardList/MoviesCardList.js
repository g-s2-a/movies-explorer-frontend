import React from 'react';
import MoviesCard from '../../Movies/MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = ({ movies, isRemovable }) => (
  <section className="movies">
    <ul className="movies__list">
      {movies.map((movie, index) => (
        <MoviesCard movie={movie} key={index} isRemovable={isRemovable} />
      ))}
    </ul>
    {
      movies.length > 6 && <button className="movies__more-button">Еще</button>
    }
  </section>
);

export default MoviesCardList;
