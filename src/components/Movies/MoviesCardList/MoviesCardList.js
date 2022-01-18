import React from 'react';
import MoviesCard from '../../Movies/MoviesCard/MoviesCard';
import { MIN_NUMBER_OF_CARDS, MAX_NUMBER_OF_CARDS } from "../../../utils/config";
import './MoviesCardList.css';

function MoviesCardList(props) {

  const [counter, setCounter] = React.useState(12);

  function showMoreMovies() {
    let addCountCards = 3;
    
    const pageWidth = document.documentElement.scrollWidth;

    if (pageWidth <= 768) {
      setCounter(8);
      addCountCards = 2;
    } else if (pageWidth <= 480) {
      setCounter(5);
      addCountCards = 2;
    };

    setCounter(counter + addCountCards);
  }

  return (
    <section className="movies">
      <ul className="movies__list">
        {props.movies.slice(0, counter).map((movie, index) => (
          <MoviesCard 
            movie={movie} 
            key={index} 
            isRemovable={props.isRemovable} 
            name={movie.nameRU}
            duration={movie.duration}
            id={movie._id}
            {...movie}
            isSavedMovies={props.isSavedMovies}
            onAddMovie={props.onAddMovie}
            onDelete={props.onDelete}
            savedMovies={props.savedMovies}
            likedMovies={props.likedMovies}
          />
        ))}
      </ul>
      {props.movies.length >= MIN_NUMBER_OF_CARDS &&
        props.movies.length > counter &&
        props.movies.length <= MAX_NUMBER_OF_CARDS &&
        !props.message ? (
          <button className="movies__more-button" onClick={showMoreMovies}>Еще</button>
        ) : (
          ""
        )}
    </section>
  );
}

export default MoviesCardList;
